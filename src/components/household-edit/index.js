import Accordion from '../accordion';
import NumericInput from '../numeric-input';
import Select from '../select';
import Checkbox from '../checkbox';

const relationshipOptions = [
    {value: 'LIFE_PARTNER', name: 'Lebenspartner'},
    {value: 'MARRIED', name: 'Verheiratet'},
    {value: 'OTHER', name: 'Andere'}
];

const accomodationOptions = [
    {value: 'ESTATE', name: 'Wohneigentum'},
    {value: 'MILITARY', name: 'beim Militär'},
    {value: 'PARENTS', name: 'bei den Eltern'},
    {value: 'RENT', name: 'zur Miete'},
    {value: 'RENT_FREE', name: 'Mietfrei'}
];

const estateType = [
    {value: 'APARTMENT', name: 'Eigentumswohnung'},
    {value: 'COMMERCIAL', name: 'Büro-/Geschäftsgebäude'},
    {value: 'MULTI_FAMILY', name: 'Mehrfamilienhaus'},
    {value: 'SINGLE_FAMILY', name: 'Einfamilienhaus'},
    {value: 'NONE', name: 'Kein Immobilienbesitz'}
];

function fieldConfig(name, data, onChange) {
    const path = name.split('.');
    return {
        name, value: data.getIn(path),
        onChange(name, value) {
            onChange(path, value);
        }
    };
}

function ApplicantHousehold({applicant, index, onChange}) {
    const handleChange = (name, value) => onChange(index, name, value);
    const sharedSettings = index > 0 ? (<div>
        <Select label="Beziehung zwischen KN" options={relationshipOptions}
            {...fieldConfig('household.applicantsRelationshipType', applicant, handleChange)} />
        <Checkbox label="Gemeinsamer Haushalt" {...fieldConfig('household.shared', applicant, handleChange)} />
    </div>) : null;
    const disableFields = applicant.getIn(['household', 'shared']);
    return (<div className="applicants__col">
        <NumericInput label="Anzahl Personen im HH" disabled={disableFields}
            {...fieldConfig('household.numberOfPersons', applicant, handleChange)} />
        <NumericInput label="Davon Kinder" disabled={disableFields}
            {...fieldConfig('household.numberOfChildren', applicant, handleChange)} />
        <Select label="Wohnsituation" disabled={disableFields} options={accomodationOptions}
            {...fieldConfig('household.accomodationType', applicant, handleChange)} />
        <Select label="Art der vermieteten Immobilie" disabled={disableFields} options={estateType}
            {...fieldConfig('household.estateType', applicant, handleChange)} />
        {sharedSettings}
    </div>);
}


export default function HouseholdEdit({applicants, onChange}) {
    return (<Accordion title="Haushalt">
        <div className="applicants">
            {applicants.map((applicant, index) => <ApplicantHousehold key={index} {...{applicant, index, onChange}} />)}
        </div>
    </Accordion>);
}
