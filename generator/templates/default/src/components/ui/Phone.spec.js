import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Phone from './Phone.vue';

Vue.use(Vuetify);

function createWrapper(propsData) {
  return mount(
    Phone,
    {
      propsData,
    },
  );
}

describe('Phone UI component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({ number: '+43 732 90 82 00-0' });
  });

  test('it should render a default phone', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('it should return a sanitized Phone number without whitespaces', () => {
    expect(wrapper.vm.sanitizedNumber).toBe('00437329082000');
  });
});
