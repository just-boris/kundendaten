import './styles.css';
import {Link} from 'react-router';

export default function Header() {
    return (<h1 className="header">
        <Link to="/">Kundendaten</Link>
    </h1>);
}
