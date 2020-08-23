import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxl/auxl'

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props){
            super(props);
            this.state = {
                error: null
            };
           this.reqInterceptor =  axios.interceptors.request.use( req=> {
                this.setState({error:null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use( res=> res, error => {
                this.setState({ error: error });
            })
        }
        // componentDidMount() { // this will run after child components are rendered i.e the child's CDMount ran and so error message will never be displayed
        //as interceptors will never be called
        //     axios.interceptors.request.use( req=> {
        //         this.setState({error:null});
        //         return req;
        //     })
        //     axios.interceptors.response.use( res=> res, error => {
        //         this.setState({ error: error });
        //     })
        // }

        componentWillUnmount(){
            console.log('will unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        closeModal = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }

}

export default WithErrorHandler