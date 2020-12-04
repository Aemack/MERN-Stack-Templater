import React, { Component } from 'react';
import {makeColumns} from '../../utils/formatting'

class HomeInfo extends Component {
    render() {
        return ( 
            <div>
                <div>
                    { formatInfo(this.props.aboutContent) }
                </div>
            </div>
         );
    }
}

function formatInfo(content){
    if (content !== undefined){
        return (
            <div>
                <h1 className="display-3">{content.name}</h1>
                <p className="text-muted"><i>{content.tagline}</i></p>
                <div>
                    { makeColumns(content.aboutContent) }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1></h1>
            </div>
        )
    }
}
 



export default HomeInfo;