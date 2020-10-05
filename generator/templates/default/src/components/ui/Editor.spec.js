import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import UiEditor from './Editor.vue';

Vue.use(Vuetify);
Vue.config.silent = true;

function createWrapper(propsData) {
  return mount(
    UiEditor,
    {
      propsData,
    },
  );
}

describe('UI Editor Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({
      value: '<h1>initial value</h1>',
    });
  });

  test('It should init the editor', () => {
    expect(wrapper.find('.ui-editor').exists()).toBe(true);
    expect(wrapper.find('.ui-editor .v-toolbar__content').exists()).toBe(true);
    expect(wrapper.find('.ui-editor .ProseMirror').exists()).toBe(true);
    expect(wrapper.find('.ui-editor .ProseMirror').contains('h1')).toBe(true);
    expect(wrapper.find('[data-qa="editor button h1"]').exists()).toBe(true);
    expect(wrapper.find('[data-qa="editor button h2"]').exists()).toBe(true);
    expect(wrapper.find('[data-qa="editor button h3"]').exists()).toBe(true);
    expect(wrapper.find('[data-qa="editor button bold"]').exists()).toBe(true);
    expect(wrapper.find('[data-qa="editor button underline"]').exists()).toBe(true);
    expect(wrapper.find('[data-qa="editor button italic"]').exists()).toBe(true);
    expect(wrapper.find('[data-qa="editor button list bulleted"]').exists()).toBe(true);
    expect(wrapper.find('[data-qa="editor button list numbered"]').exists()).toBe(true);
    expect(wrapper.find('[data-qa="editor button link"]').exists()).toBe(true);
  });

  test('It should validate a link', async () => {
    wrapper.setData({
      link: {
        url: '',
        showMenu: true,
      },
    });
    const validationErrorMessage = 'Bitte gib einen gültigen Link beginnend mit https:// oder http:// ein';

    expect(wrapper.find('[data-qa="editor link menu"]').isVisible()).toBe(true);

    wrapper.vm.$refs.linkInput.$emit('input', 'invalid link');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-messages.error--text').text()).toBe(validationErrorMessage);

    wrapper.vm.$refs.linkInput.$emit('input', 'https://www.karriere.at');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-messages.error--text').text()).toBe('');
  });

  test('It should show an error message', () => {
    expect(wrapper.find('.v-messages.error--text').text()).toBe('');

    wrapper = createWrapper({
      value: '<h1>yolo</h1>',
      errorMessages: 'A wild error appeared!',
    });

    expect(wrapper.find('.v-messages.error--text').text()).toBe('A wild error appeared!');
  });
});
