import { shallowMount } from '@vue/test-utils'
import Toggle from '@/components/ToggleSwitch/Toggle.vue'
import { nextTick } from 'vue'

const TestToggle = {
  components: { Toggle },
  template: `
    <toggle />
  `
}

function factory(props?: { [key: string]: any }) {
  return shallowMount(Toggle, {
    props
  })
}

describe('Component: Toggle.vue', () => {
  it('Toggle on', async () => {
    const wrapper = factory()
    await wrapper.get('.toggler').trigger('click')
    await nextTick()
    expect(
      wrapper
        .get('.slider')
        .attributes()
        .style.includes(
          'background-color: rgb(110, 64, 201); transform: translateX(18px);'
        )
    ).toBe(true)
  })

  it('Toggle off', async () => {
    const wrapper = factory({ status: true })
    await wrapper.get('.toggler').trigger('click')
    await nextTick()
    expect(
      wrapper
        .get('.slider')
        .attributes()
        .style.includes(
          'background-color: rgb(16, 14, 22); transform: translateX(0);'
        )
    ).toBe(true)
  })
})
