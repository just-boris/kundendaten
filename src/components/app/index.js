import {connect} from 'react-redux';
import {updateAccount, saveAccount} from '../../actions';
import Input from '../input';
import Output from '../output';
import NumericInput from '../numeric-input';

function App({account, updateAccount, saveAccount}) {
  return (<div>
    <h1>Kundedaten</h1>
    <Input name="firstName" value={account.firstName} label="Vorname" onChange={updateAccount} />
    <Input name="lastName" value={account.lastName} label="Name" onChange={updateAccount} />
    <h2>Einkommen</h2>
    <NumericInput name="salary" label="Gehalt" value={account.salary} onChange={updateAccount} />
    <NumericInput name="otherIncome" label="Andere Einkommen" value={account.salary} onChange={updateAccount} />
    <h2>Expenses</h2>
    <NumericInput name="rent" label="Miete" onChange={updateAccount} />
    <NumericInput name="otherExpense" label="Andere Expense" onChange={updateAccount} />
    <h2>Gesamt</h2>
    <Output name="total" label="Ergebnis" value={account.total} />
    <button onClick={saveAccount}>Spreichen</button>
  </div>);
}

function mapProps({account = {}}) {
    return {account};
}

const mapActions = {updateAccount, saveAccount};

export default connect(mapProps, mapActions)(App)
