import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  data: any[] = []; // Array to hold the uploaded data
  displayedColumns: string[] = []; // Column names for displaying data
  filterForm: FormGroup; // Form group to manage filters
  filteredData: any[] = []; // Array to hold filtered data
  conditionOptions = [
    { label: 'Greater Than', value: 'Greater Than' },
    { label: 'Less Than', value: 'Less Than' },
    { label: 'Not Containing', value: 'Not Containing' },
    { label: 'Beginning With', value: 'Beginning With' },
  ];

  operatorOptions = [
    { label: 'AND', value: 'AND' },
    { label: 'OR', value: 'OR' },
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      rules: this.fb.array([]), // Initialize rules as a FormArray
    });
  }

  get rules(): FormArray {
    return this.filterForm.get('rules') as FormArray;
  }

  getSubRules(ruleIndex: number): FormArray {
    return this.rules.at(ruleIndex).get('subRules') as FormArray;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any = XLSX.utils.sheet_to_json(worksheet);

      this.data = jsonData; // Store the data
      this.displayedColumns = Object.keys(jsonData[0]); // Get column names from the data
      console.log('Loaded Data:', this.data); // Log the loaded data
    };

    reader.readAsBinaryString(file);
  }

  addRule() {
    const ruleGroup = this.fb.group({
      subRules: this.fb.array([]), // Initialize subRules as FormArray,
      operator: [''], // Initialize operator control
    });
    this.rules.push(ruleGroup);
  }

  removeRule(ruleIndex: number) {
    this.rules.removeAt(ruleIndex);
  }

  addSubRule(ruleIndex: number) {
    const subRuleGroup = this.fb.group({
      field: [''],
      condition: [''],
      value: [''],
      operator: [''], // Add operator here
    });
    this.getSubRules(ruleIndex).push(subRuleGroup);
  }

  removeSubRule(ruleIndex: number, subRuleIndex: number) {
    this.getSubRules(ruleIndex).removeAt(subRuleIndex);
  }

  applyFilters() {
    this.filteredData = [...this.data];

    // Loop over all rule groups and apply the filters
    this.rules.controls.forEach((control: AbstractControl) => {
      const ruleGroup = control as FormGroup;
      const subRules = ruleGroup.get('subRules') as FormArray;
      const operator = ruleGroup.get('operator')?.value;

      console.log('operator', operator);
      // Filter the data based on all sub-rules within this rule group
      this.filteredData = this.filteredData.filter((item) => {
        if (operator === 'AND') {
          return subRules.controls.every((subRuleControl: AbstractControl) => {
            const subRule = subRuleControl as FormGroup;
            return this.applySubRule(subRule, item);
          });
        } else if (operator === 'OR') {
          return subRules.controls.some((subRuleControl: AbstractControl) => {
            const subRule = subRuleControl as FormGroup;
            return this.applySubRule(subRule, item);
          });
        }
        return true;
      });
    });

    console.log('Filtered Data:', this.filteredData);
  }

  applySubRule(subRule: FormGroup, item: any): boolean {
    const field = subRule.get('field')?.value;
    const condition = subRule.get('condition')?.value;
    const value = subRule.get('value')?.value;

    const itemValue = item[field];
    let formattedValue = value;

    if (!isNaN(value)) {
      formattedValue = parseFloat(value);
    }

    switch (condition) {
      case 'Greater Than':
        return !isNaN(itemValue) && parseFloat(itemValue) > formattedValue;
      case 'Less Than':
        return !isNaN(itemValue) && parseFloat(itemValue) < formattedValue;
      case 'Not Containing':
        return typeof itemValue === 'string' && !itemValue.includes(value);
      case 'Beginning With':
        return typeof itemValue === 'string' && itemValue.startsWith(value);
      default:
        return true;
    }
  }

  submit() {
    this.applyFilters(); // Apply filters on submit
    console.log(this.filteredData); // Handle form submission and view filtered data
  }

  logForm() {
    console.log('FORM -> ', this.filterForm);
  }
}
