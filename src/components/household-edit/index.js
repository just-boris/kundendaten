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

function ApplicantHousehold({applicant, index, onChange}) {
    const handleChange = (name, value) => onChange(index, name, value);
    const sharedSettings = index > 0 ? (<div>
        <Select label="Beziehung zwischen KN" name="applicantsRelationshipType"
            value={applicant.applicantsRelationshipType} options={relationshipOptions}
            onChange={handleChange} />
        <Checkbox label="Gemeinsamer Haushalt" name="sharedHousehold" onChange={handleChange} />
    </div>) : null;
    return (<div className="applicants__col">
        <NumericInput name="numberOfPersonsInHousehold" label="Anzahl Personen im HH" value={applicant.salary} onChange={handleChange} />
        <NumericInput name="numberOfChildren" label="Davon Kinder" value={applicant.salary} onChange={handleChange} />
        <Select name="accomodationType" label="Wohnsituation" options={accomodationOptions} onChange={handleChange} />
        <Select name="fullyRentedEstateType" label="Art der vermieteten Immobilie" options={estateType} onChange={handleChange} />
        {sharedSettings}
    </div>);
}


export default function PersonEdit({applicants, onChange}) {
    return (<Accordion title="Haushalt">
        <div className="applicants">
            {applicants.map((applicant, index) => <ApplicantHousehold key={index} {...{applicant, index, onChange}} />)}
        </div>
    </Accordion>);
}
