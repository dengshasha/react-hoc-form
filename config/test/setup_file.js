import { configure } from 'enzyme'

global.React = require("react");
global.Enzyme = require("enzyme");
global.Adapter = require("enzyme-adapter-react-16")

configure({ adapter: new Adapter() })



// Object.defineProperty(window,'IBU_HOTEL',)
