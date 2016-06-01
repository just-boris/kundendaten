import NumericInput from '../../src/components/numeric-input';
import {createSpy} from 'expect';
import {mount} from 'enzyme';

describe('NumericInput', function() {
    beforeEach(function() {
        this.onChange = createSpy();
        this.component = mount(<NumericInput label="Test field" name="test" onChange={this.onChange} />);
    });

    it('should render empty input by default', function() {
        expect(this.component.find('.input__control').prop('value')).toEqual('');
    });

    it('should render and format number', function() {
        this.component.setProps({value: 10.5});
        expect(this.component.find('.input__control').prop('value')).toEqual('10,5');
        this.component.setProps({value: 1000});
        expect(this.component.find('.input__control').prop('value')).toEqual('1000');
    });

    it('should update component value', function() {
        this.component.find('.input__control').simulate('blur', {target: {name: 'test', value: '11,6'}});
        expect(this.onChange).toHaveBeenCalledWith('test', 11.6);
    });

    it('should return 0 instead of invalid numbers', function() {
        this.component.find('.input__control').simulate('blur', {target: {name: 'test', value: 'not a number'}});
        expect(this.onChange).toHaveBeenCalledWith('test', 0);
    });
});
