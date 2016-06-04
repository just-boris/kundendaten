import {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Header from '../header';
import {loadAccounts} from '../../actions/accounts';

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

    render() {
        const {accounts} = this.props;
        const {loading} = this.state;
        const content = loading ? <span>Beladung...</span> : <div>
            <h2>Kontoliste</h2>
            <ul>
                {accounts.map((account) => {
                    const applicant = account.applicants[0];
                    return (<li key={account.id}>
                        <Link to={`/${account.id}`}>{applicant.person.firstName} {applicant.person.lastName}</Link>
                    </li>);
                })}
            </ul>
        </div>;
        return (<div>
            <Header />
            {content}
        </div>);
    }
}

export default connect(({accounts}) => ({accounts}), {loadAccounts})(AccountsList);
