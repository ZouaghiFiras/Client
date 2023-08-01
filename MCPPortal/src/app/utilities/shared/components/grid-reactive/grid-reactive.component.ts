import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-grid-reactive',
  templateUrl: './grid-reactive.component.html',
  styleUrls: ['./grid-reactive.component.scss']
})
export class GridReactiveComponent implements OnInit, OnChanges, OnDestroy {
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /*  @Input() gridColumns: Array<ReactiveGridClomunsModel>
   @Output() listToSend: EventEmitter<Array<CodeLabelModel>> = new EventEmitter<Array<CodeLabelModel>>()
   @Input() initGrid: Array<CodeLabelModel>

   @Output() listClientsToSend: EventEmitter<any> = new EventEmitter<any>()
   @Input() initClientsGrid: any
   @Input() name: string
   @Input() route
   @Input() activeAgent
   @ViewChild('grid', { static: false })
   private grid: GridComponent;
   public legalName
   private organizationUnitToUpdate


   // public gridColumns = [
   //   {name:'organizationCodeTypeId',title:"Code Type",type : "dropdown"},

   //   {name:'code',title:'Code Name', type : "input"},
   //   {name:'validFromDate',title:'column3',type : "datepicker"},
   //   {name:'validUntilDate',title:'column4',  type : "datepicker"}
   // ];
   // @Output() codesGrid :EventEmitter<any[]> = new EventEmitter<any[]>()
   public view: any[] = [];
   //public gridData = process(this.view, this.gridState)
   public switchAgent: boolean
   public gridState: State = {

     skip: 0,
     take: 5,
     filter: {
       logic: 'and',
       filters: [],
     },
   };
   public gridData = process(this.view, this.gridState)
   public selectableSettings: SelectableSettings = {
     mode: 'multiple',
   };
   public formGroup: FormGroup


   private editedRowIndex: number;

   constructor(private editService: CodesService, private organizationUnitService: OrganizationUnitService, public datepipe: DatePipe,
     private router: Router) {
   }

   public ngOnInit(): void {
     this.filterChange("")
     this.organizationUnitToUpdate = [...this.view]


   }
   ngOnDestroy() {

   }

   public group: any = {};
   initFormGroup() {
     const group: any = {};

     this.gridColumns.forEach(ele => {
       group[ele.name] = ele.required ?
         ele.name === 'codeClient' ? new FormControl("", [Validators.maxLength(20)]) : new FormControl("", [Validators.required]) :
         new FormControl("")
     })
     return new FormGroup(group)


   }
   pageChange(event): void {
     this.gridState.skip = event.skip;
     this.gridData.data = this.view.slice(this.gridState.skip, this.gridState.skip + this.gridState.take);
   }
   gridDatacode = []
   ngOnChanges(changes: SimpleChanges) {
     const currentItem: SimpleChange = changes.initGrid
     this.gridDatacode = this.initGrid ? this.initGrid : []
     this.name === 'Clients' ?
       this.initClientsGrid ? this.view = this.initClientsGrid : this.view = [] :
       this.initGrid ? this.view = this.initGrid : this.view = []
     this.gridData.data = this.view
     this.gridData = process(this.view, this.gridState)
     this.listToSend.emit(this.view)
     this.listClientsToSend.emit(this.view)
     this.formGroup = this.initFormGroup()
     this.switchAgent = this.activeAgent
     if (this.switchAgent === false && this.grid) {
       this.closeEditor(this.grid, -1)
     }



   }

   public onStateChange(state: DataStateChangeEvent) {
     if (state.filter.filters.length > 0) {
       this.gridState.filter = state.filter;
     } else {
       this.gridState.filter.filters = [];
     }

     this.editService.read();
   }

   public addHandler({ sender, dataItem }) {
     this.filterChange("")
     this.closeEditor(sender);
     this.name === 'Clients' ?
       this.formGroup = new FormGroup({
         id: new FormControl(this.view.length + 1),
         client: new FormControl("", [Validators.required]),
         codeClient: new FormControl("",),
         nameClient: new FormControl(""),
       }) :
       this.formGroup = new FormGroup({
         id: new FormControl(this.view.length + 1),
         code: new FormControl("", [Validators.required]),
         organizationCodeTypeId: new FormControl("", [Validators.required]),
         validFromDate: new FormControl(null),
         validUntilDate: new FormControl(null)
       });

     sender.addRow(this.formGroup);
   }
   public oldValue: any
   public editHandler({ sender, rowIndex, dataItem }) {
     if (this.name === 'Clients') {
       this.filterChange(dataItem.client.longName)
       this.legalName = dataItem.client
     }
     this.oldValue = dataItem

     this.closeEditor(sender);
     // const row = this.codeTypeList.find(i => i.shortName === dataItem.organizationCodeTypeId);
     if (this.name !== 'Clients') {
       dataItem.validFromDate ? dataItem.validFromDate = new Date(dataItem.validFromDate) : dataItem.validFromDate

       dataItem.validUntilDate ? dataItem.validUntilDate = new Date(dataItem.validUntilDate) : dataItem.validUntilDate

     }
     this.name === 'Clients' ?
       this.formGroup = new FormGroup({
         id: new FormControl(dataItem.id),
         client: new FormControl(dataItem.client, [Validators.required]),
         codeClient: new FormControl(dataItem.codeClient),
         nameClient: new FormControl(dataItem.nameClient),
       }) :
       this.formGroup = new FormGroup({
         'id': new FormControl(dataItem.id),
         'code': new FormControl(dataItem.code, [Validators.required]),
         'organizationCodeTypeId': new FormControl(dataItem.oucOrganizationCodeTypeId, [Validators.required]),
         'validFromDate': new FormControl(dataItem.validFromDate),
         'validUntilDate': new FormControl(dataItem.validUntilDate)
       });

     this.editedRowIndex = rowIndex;

     sender.editRow(rowIndex, this.formGroup);
   }

   public cancelHandler({ sender, rowIndex }) {

     this.closeEditor(this.grid, rowIndex);
   }

   public saveHandler({ sender, rowIndex, formGroup, isNew }) {
     if (this.name !== 'Clients') {
       formGroup.value.validFromDate = this.datepipe.transform(formGroup.value.validFromDate, 'yyyy-MM-dd')
       formGroup.value.validUntilDate = this.datepipe.transform(formGroup.value.validUntilDate, 'yyyy-MM-dd')
     }

     let row = formGroup.value

     // this.editService.save(product,  sender.formGroup.isNew);
     if (!isNew) {
       const row = this.view.find(i => i.id === this.oldValue.id);
       const index = this.view.indexOf(row)
       this.view.splice(index, 1)

     }
     // product .organizationCodeTypeId = product.organizationCodeTypeId.shortName
     this.view = [...this.view, row]
     //  .push(row)
     this.gridData = process(this.view, this.gridState)

     sender.closeRow(rowIndex);
     this.validateChanges(this.view)
     this.listToSend.emit(this.view)
     this.listClientsToSend.emit(this.view)


     // this.codesGrid.emit(this.view)
   }
   validateChanges(orgAfterUpdate) {

     this.organizationUnitService.updateOrganizationUnit.next(!(_.isEqual(orgAfterUpdate, this.organizationUnitToUpdate)))

   }

   public removeHandler({ dataItem }) {
     const index = this.view.indexOf(dataItem)
     this.view.splice(index, 1)
     this.gridData = process(this.view, this.gridState)
     this.validateChanges(this.view)

     this.listToSend.emit(this.view)
     this.listClientsToSend.emit(this.view)

     //this.editService.remove(dataItem);
     //this.codesGrid.emit(this.view)

   }

   private closeEditor(grid, rowIndex = this.editedRowIndex) {


     this.grid.closeRow(rowIndex);

     this.editedRowIndex = undefined;
     // this.formGroup = undefined;
   }
   returnField(n) {
     if (n.name == 'organizationCodeTypeId') {
       return n.name + '.shortName'
     }
     else if (n.name == 'client') {
       return n.name + '.longName'
     }
     else {
       return n.name
     }
   }
   public textField: string
   public valueField: string
   returnTextVlaueField() {
     if (this.name !== 'Clients') {
       this.textField = 'shortName'
       this.valueField = 'id'
     } else {
       this.textField = 'longName'
       this.valueField = 'clId'
     }
   }
   // get clients type list
   public filterChange(filter: string): void {
     this.name === 'Clients' ?
       filter.length > 0 ?
         this.organizationUnitService.getClientByName(filter).subscribe(list => {
           this.typeList = list
         })
         : this.typeList = [] :
       true
   } */


}

