import React, {Component} from 'react';
import { Tab } from 'semantic-ui-react';

    class ToolsTab extends React.Component {
    constructor(){
        super();
    }

  render() {
    const panes = [
      { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
      { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ];
    return (
    <div className="tabContent"><br/>
      {/* <div className="container fluid"> */}
    <ul className="nav nav-tabs">
        <li className="nav active"><a href="#A" data-toggle="tab">Flowchart </a></li>
        <li className="nav"><a href="#E" data-toggle="tab">Jira</a></li>
        <li className="nav"><a href="#B" data-toggle="tab">Git</a></li>
        <li className="nav"><a href="#C" data-toggle="tab">Jenkins</a></li>
        <li className="nav"><a href="#D" data-toggle="tab">SonarQube</a></li>
    </ul>
    <div className="tab-content">
        <div className="tab-pane fade in active" id="A"><img  className="iFrameContent" src="../img/pipeline.png"/></div>
        <div className="tab-pane fade" id="B"><iframe className="iFrameContent" src="http://wiproadapt.eastus.cloudapp.azure.com" frameborder="0" allowfullscreen></iframe></div>
        <div className="tab-pane fade" id="C"><iframe className="iFrameContent" src="http://prism.wiproaz.com:8080" frameborder="0" allowfullscreen></iframe></div>
        <div className="tab-pane fade" id="D"><iframe className="iFrameContent" src="http://prism.wiproaz.com:9000" frameborder="0" allowfullscreen></iframe></div>
        <div className="tab-pane fade" id="E"><iframe className="iFrameContent" src="http://agilenext.wipro.com:8100" frameborder="0" allowfullscreen></iframe></div>
    </div>
{/*</div>*/}
</div>
);
}
}
module.exports = ToolsTab;
