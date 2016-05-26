import './styles.css';
import {PropTypes, Component} from 'react';

export default class Accordion extends Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.state = {open: false};
    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const {title, children} = this.props;
        const {open} = this.state;
        return (<div className="accordion">
            <h2 className="accordion__title" onClick={this.toggle}>{title}</h2>
            {open ? <div className="accordion__body">{children}</div> : ''}
        </div>);
    }
}

Accordion.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
};
