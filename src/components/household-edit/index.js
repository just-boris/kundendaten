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


export default function PersonEdit({applicants, onChange}) {
    return (<Accordion title="Haushalt">
        <div className="applicants">
            {applicants.map((applicant, index) => (<div className="applicants__col" key={index}>
                <Select label="Beziehung zwischen KN" name="applicantsRelationshipType"
                    value={applicant.applicantsRelationshipType} options={relationshipOptions} />
                <Checkbox label="Gemeinsamer Haushalt" name="sharedHousehold" onChange={(name, value) => onChange(index, name, value)} />
                <NumericInput name="numberOfPersonsInHousehold" label="Anzahl Personen im HH" value={applicant.salary} onChange={(name, value) => onChange(index, name, value)} />
                <NumericInput name="numberOfChildren" label="Davon Kinder" value={applicant.salary} onChange={(name, value) => onChange(index, name, value)} />
                <Select name="accomodationType" label="Wohnsituation" options={accomodationOptions} onChange={(name, value) => onChange(index, name, value)} />
                <Select name="fullyRentedEstateType" label="Art der vermieteten Immobilie" options={estateType} onChange={(name, value) => onChange(index, name, value)} />
            </div>))}
        </div>
    </Accordion>);
}
