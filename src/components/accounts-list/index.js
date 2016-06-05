import './styles.css';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Header from '../header';
import {loadAccounts} from '../../actions/accounts';
import bem from 'bem-cn';

const b = bem('accounts-list');

export class AccountsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.setState({loading: true});
        this.props.loadAccounts().then(() =>
            this.setState({loading: false})
        ).catch(e =>
            console.error(e) // eslint-disable-line no-console
        );
    }

    renderAccount(account) {
        const names = account.applicants
            .map(applicant =>
                applicant.person && `${applicant.person.firstName || ''} ${applicant.person.lastName || ''}` || 'Namenlos Person')
            .join(' & ');
        return (<li key={account.id}>
            <Link to={`/${account.id}`} className={b('row', {link: true})}>
                <div className={b('col', {number: true})}>{account.id}</div>
                <div className={b('col', {name: true})}>{names}</div>
            </Link>
        </li>);
    }

    render() {
        const {accounts} = this.props;
        const {loading} = this.state;
        const content = loading ? <span>Beladung...</span> : <div className={b('content')}>
            <h2>Kontoliste</h2>
            <ul className={b('table')}>
                <li className={b('row', {head: true})}>
                    <div className={b('col', {number: true})}>#</div>
                    <div className={b('col', {name: true})}>Namen</div>
                </li>
                {accounts.map(this.renderAccount, this)}
            </ul>
        </div>;
        return (<div>
            <Header />
            {content}
        </div>);
    }
}

export default connect(({accounts}) => ({accounts}), {loadAccounts})(AccountsList);
