import { es5, isEntry } from '../constants/env_vars';
import * as deps from '../constants/npm-imports';
import {
	getComponentPath,
	getComponentName, } from '../utils/file';

const args = process.argv.slice(2)
const componentPath = getComponentPath(args[1])
const componentName = getComponentName(componentPath)

let template,reactImports, compBody, compEnd = ``;

// Generate ES5 Component
if (es5) {
  reactImports = deps.React[1]
  compBody =
`

var ${componentName} = React.createClass({
  render: function() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
})
`
}
// Or ES6 Component
else {
  reactImports = deps.React[0];
  compBody =
`
import styles from './${componentName}.pcss'

class ${componentName} extends Component {

    static propTypes = {
    
    }
    
    render() {
        return (
            <div>
            
            </div>
      )
    }
}

export default ${componentName}
`
}


// Mounts componentName to the DOM
if (isEntry) {
  if (es5) {
    reactImports +=
`
${deps.ReactDOM[1]}`
  }
  else {
    reactImports +=
`
${deps.ReactDOM[0]}`
  }

  compEnd +=
`
ReactDOM.render(<${componentName}/>, document.getElementById('app'));
`
}
else {
  if (es5) {
    compEnd += `
module.exports = ${componentName};
  `;
  }
}

template = reactImports + compBody + compEnd

// function createTemplate() {
//
// }

// Export component
export default template;