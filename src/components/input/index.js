import './styles.css';
import {PropTypes, Component} from 'react';
import bem from 'bem-cn';

const b = bem('input');

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.handleChange = this.handleChange.bind(this);
        this.reportChange = this.reportChange.bind(this);
    }

    componentWillReceiveProps({value}) {
        if(value !== this.props.value) {
            this.setState({value});
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    reportChange(e) {
        this.props.onChange(e.target.name, e.target.value);
    }

    render() {
        const {name, label, disabled, children} = this.props;
        const {value} = this.state;
        const input = children || <input type="text" className={b('control', {disabled})}
            name={name} value={value} disabled={disabled}
            onChange={this.handleChange} onBlur={this.reportChange} />;
        return (<label className="input">
            <div className={b('label')}>{label}</div>
            {input}
        </label>);
    }
}

Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node
};

Input.defaultProps = {
    value: '',
    onChange() {}
};
