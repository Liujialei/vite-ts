
import { h, defineComponent, Component, resolveComponent } from 'vue'

export function UseElIcon(icon: string, _class?: object): Component {
  
	return defineComponent({
    name: 'UseElIcon',
    render() {
      return h('div', {
        _class: _class||''
      },[
        h(resolveComponent(icon))
      ])
			// return h(resolveComponent(icon))
    }
  })
}