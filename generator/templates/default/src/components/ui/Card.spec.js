import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import UiCard from './Card.vue';

Vue.use(Vuetify);

function createWrapper(propsData) {
  return mount(
    UiCard,
    {
      propsData,
    },
  );
}

describe('Card', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({});
  });

  test('it should render a default card', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('v-card');
  });

  test('it should render title', () => {
    wrapper = createWrapper({ cardTitle: 'Text Card Title' });
    expect(wrapper.find('[data-qa="toolbar title"]').text()).toBe('Text Card Title');
  });

  test('it should not display toolbar when title is omitted', () => {
    wrapper = createWrapper({ cardTitle: '' });
    expect(wrapper.find('[data-qa="toolbar title"]').exists()).toBe(false);
  });

  test('it should render not card actions', () => {
    const cardActions = wrapper.find('.v-card__actions');
    expect(cardActions.exists()).toBe(false);
  });

  test('it should render card actions', () => {
    wrapper = createWrapper({ hasActions: true });
    expect(wrapper.exists('.v-card__actions')).toBe(true);
  });
});

describe('Card Slots', () => {
  test('it should render toolbar action slot', () => {
    const wrapper = mount(UiCard, {
      slots: {
        'toolbar-action': '<div class="fake-txt"></div>',
      },
    });

    const fakeTxt = wrapper.find('.v-toolbar__content .fake-txt');
    expect(fakeTxt.exists()).toBe(true);
  });

  test('it should render default slot', () => {
    const wrapper = mount(UiCard, {
      slots: {
        default: '<div class="fake-txt"></div>',
      },
    });

    const fakeTxt = wrapper.find('.fake-txt');
    expect(fakeTxt.exists()).toBe(true);
  });

  test('it should render actions slot', () => {
    const wrapper = mount(UiCard, {
      propsData: { hasActions: true },
      slots: {
        actions: '<div class="fake-txt"></div>',
      },
    });

    const fakeTxt = wrapper.find('.v-card__actions .fake-txt');
    expect(fakeTxt.exists()).toBe(true);
  });
});
