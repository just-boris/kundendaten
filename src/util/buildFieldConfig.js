export default function fieldConfig(name, data, onChange) {
    const path = name.split('.');
    return {
        name, onChange, value: data.getIn(path)
    };
}
