import easing from 'eases/quad-in-out';

/**
 * Facade for basic UI functions
 * - alerts
 * - dialogs
 */
class Ui {
  constructor() {
    this._$alert = null;
    this._$dialog = null;
    this._$loader = null;
  }

  /**
   * shows an alert message
   * @param string message message
   * @param string severity 'info', 'success' or 'error'
   * @param int duration duration in milliseconds (optional)
   */
  alert(message, severity, duration) {
    if (!this._$alert) {
      console.error('No alert handler registered in Ui Utility!');
      return;
    }

    this._$alert.show(message, severity, duration);
  }

  /**
   * shows a confirm dialog
   * @param string title dialog title
   * @param string message confirm message
   * @param string confirmLabel label for the confirm button (optional)
   * @param string cancelLabel label for the cancel button (optional)
   * @return Promise|null a promise that is resolved with true (confirmed) or false (cancelled)
   */
  confirm(title, message, confirmLabel, cancelLabel) {
    if (!this._$dialog) {
      console.error('No dialog handler registered in Ui Utility!');
      return null;
    }

    return this._$dialog.show({
      title,
      body: message,
      confirmLabel,
      cancelLabel,
      hasConfirmButton: true,
      hasCancelButton: true,
      modal: true,
      maxWidth: 500,
    });
  }

  /**
   * shows a general dialog
   * @param string title dialog title (pass empty title to omit)
   * @param Object component Vue Component that will be rendered inside the dialog (an "onClose"
   * property with a callback function will be passed to the component to allow it to close the
   * dialog)
   * @param Object componentData data that will be passed to the component as props (optional)
   * @param boolean modal true to open a blocking dialog (default: false)
   * @return Promise a promise that will be resolved when the dialog is closed
   */
  dialog(title, component, componentData, modal) {
    return this._$dialog.show({
      title,
      component,
      componentData,
      modal: !!modal,
    });
  }

  /**
   * shows the loader and sets it to an estimated time duration
   * (but waits until finishLoading() is called)
   * @param estimatedTime duration in milliseconds
   */
  startLoading(estimatedTime = 500) {
    this._$loader.start(estimatedTime);
  }

  /**
   * hides the loader when the loading is done
   */
  finishLoading() {
    this._$loader.finish();
  }

  /**
   * scrolls the window to the given DOM element
   * @param $el
   */
  static scrollTo($el, duration = 250) {
    const $body = document.body.scrollTop ? document.body : document.documentElement;
    const headerOffset = 60;
    const top = ($body.scrollTop + $el.getBoundingClientRect().top) - headerOffset;

    this.scrollToPosition(top, duration);
  }

  /**
   * scrolls the window to the top
   * @param duration animation time in milliseconds
   */
  static scrollToTop(duration = 250) {
    this.scrollToPosition(0, duration);
  }

  static scrollToPosition(position, duration = 250) {
    const $el = document.body.scrollTop ? document.body : document.documentElement;
    const startTime = Date.now();
    const startPosition = $el.scrollTop;

    const scroll = () => {
      const progress = easing(Math.min(1, ((Date.now() - startTime) / duration)));

      $el.scrollTop = startPosition - (progress * (startPosition - position));
      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }

  /**
   * Give some feedback to the user if an error occurred in an API request
   * @param error Axios error object
   * @param defaultMessage message that is displayed if no other message can be
   * generated from the error object
   */
  showApiError(error, defaultMessage) {
    const res = error.response;
    if (res && res.status === 400 && Array.isArray(res.data) && res.data[0].title) {
      const firstError = res.data[0];
      let msg = `Es ist ein Validierungs-Fehler beim Feld "${firstError.title}" aufgetreten: `;
      msg += firstError.detail;
      this.alert(msg, 'error', 5000);
      console.warn(error);
    } else {
      this.alert(defaultMessage, 'error');
      console.error(error);
    }
  }

  /**
   * registers a component that will display the alert
   * this component must implement a method show(message, [duration])
   * @param Vue $alert component
   */
  registerAlert($alert) {
    this._$alert = $alert;
  }

  /**
   * registers a component that will display the dialogs
   * this component must implement a method show({ options })
   * @param Vue $dialog component
   */
  registerDialog($dialog) {
    this._$dialog = $dialog;
  }

  /**
   * registers a component that will displayed while loading data
   * this component must implement a method start(estimatedTime) and finish()
   * @param Vue $loader component
   */
  registerPageLoadingIndicator($loader) {
    this._$loader = $loader;
  }
}

export default new Ui();
