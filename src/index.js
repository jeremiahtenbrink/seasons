import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
    constructor( props ) {
        super( props );
        
        this.state = { lat: null, long: null, errorMessage: "" };
        
    }
    
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState( {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    errorMessage: ""
                }),
            err => this.setState( { errorMessage: err.message } )
        );
    }
    
    renderContent() {
        if( this.state.errorMessage && !this.state.lat ) {
            return <div>Error: { this.state.errorMessage }</div>;
        }else if( !this.state.errorMessage && this.state.lat) {
            return ( <SeasonDisplay lat={this.state.lat}/>
            );
        }else {
            return <Spinner message={"Loading... Please allow location so we can determine the" +
            " season for your geo location."}/>;
        }
    }
    
    render() {
        return <div>
            {this.renderContent()}
        </div>
    }
}

ReactDOM.render( <App />, document.querySelector( "#root" ) );
