import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { Dropdown, DropdownItem, DropdownMenu } from '@/components/Dropdown'
import { createPinia } from 'pinia'
import VueClickAway from 'vue3-click-away'

const pinia = createPinia()

// Simulate a dropdown menu
const TestDropdown = {
  name: 'TestDropdown',
  components: { Dropdown, DropdownItem, DropdownMenu },
  props: {
    hover: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const option = ref('')

    const handleClick = (name: string) => {
      option.value = name
    }

    return { option, handleClick }
  },
  template: `
    <div>
      <div data-test="outside-box">Outside box</div>
      <dropdown :hover="hover" @command="handleClick">
        <span data-test="result">Current option: {{option}}</span>
        <dropdown-menu>
          <dropdown-item name="option-1" data-test="option1">1</dropdown-item>
          <dropdown-item name="option-2" data-test="option2">2</dropdown-item>
        </dropdown-menu>
      </dropdown>
    </div>
  `
}

const factory = (components: any, props?: any) => {
  return mount(components, {
    props: props ? props : {},
    global: {
      plugins: [pinia, VueClickAway]
    }
  })
}

describe('Component: Dropdown', () => {
  it('open menu by clicking', async () => {
    const wrapper = factory(TestDropdown)
    await wrapper.findComponent(Dropdown).trigger('click')
    expect(wrapper.find('[data-test="option1"]').text()).toBe('1')
    expect(wrapper.find('[data-test="option2"]').text()).toBe('2')
  })

  it('close menu by clicking outside', async () => {
    const wrapper = factory(TestDropdown)
    await wrapper.findComponent(Dropdown).trigger('click')
    expect(wrapper.find('[data-test="option1"]').exists()).toBe(true)
    await wrapper.findComponent(Dropdown).trigger('click')
    await nextTick()
    expect(wrapper.find('[data-test="option1"]').exists()).toBe(false)
  })

  it('opening menu by hover', async () => {
    const wrapper = factory(TestDropdown, { hover: true })
    await wrapper.findComponent(Dropdown).trigger('mouseover')
    expect(wrapper.find('[data-test="option1"]').text()).toBe('1')
    expect(wrapper.find('[data-test="option2"]').text()).toBe('2')
  })

  it('close menu by hover outside', async () => {
    const wrapper = factory(TestDropdown, { hover: true })
    await wrapper.findComponent(Dropdown).trigger('mouseover')
    expect(wrapper.find('[data-test="option1"]').exists()).toBe(true)
    await wrapper.findComponent(Dropdown).trigger('mouseleave')
    await nextTick()
    expect(wrapper.find('[data-test="option1"]').exists()).toBe(false)
  })

  it('choosing option 1', async () => {
    const wrapper = factory(TestDropdown)
    await wrapper.findComponent(Dropdown).trigger('click')
    await wrapper.find('[data-test="option1"]').trigger('click')
    expect(wrapper.find('[data-test="result"]').text()).toBe(
      'Current option: option-1'
    )
  })
})
