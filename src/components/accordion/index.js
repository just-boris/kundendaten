import './styles.css';
import {PropTypes, Component} from 'react';
import bem from 'bem-cn';
import Collapse from 'react-collapse';

const b = bem('accordion');

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
        return (<div className={b({open})}>
            <h2 className={b('title')} onClick={this.toggle}>
                {title}
                <span className={b('icon')}></span>
            </h2>
            <Collapse isOpened={open}>
                {open ? <div className={b('body')}>{children}</div> : ''}
            </Collapse>
        </div>);
    }
}

Accordion.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
};
