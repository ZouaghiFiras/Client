// import { GeneralViewModel } from '../../new-entry/models/general-view.model';
// import { AddressModel } from '../../new-entry/locations/address/address.model';
// import { LabelModel } from '../../new-entry/label/label.model';
// import { NoteModel } from './note.model';
// import { RepairerModel } from '../../new-entry/parties/repairer/repairer.model';
// import { SupplierModel } from '../../new-entry/parties/supplier/supplier.model';
// import { HierarchyListModel } from '../../new-entry/hierarchy/hierarchy.model';
// import { CodesModel } from '../../new-entry/codes/codes.model';
//
// export class OrganizationUnitModel {
//     code?: string;
//     id?: string;
//     shortName?: string;
//     longName3?: string;
//     longName2?: string;
//     longName?: string;
//     startDate?: Date;
//     endDate?: Date;
//     active?: boolean;
//     tenantId?: string;
//     organizationTypeId?: string;
//     organizationApplications?: any[];
//     vatNumber?: string;
//     noVatNumber?: false;
//     chamberOfCommerceNumber?: string;
//     officialAddress?: AddressModel;
//     postalAddress?: AddressModel;
//     visitAddress?: AddressModel;
//     addresses?: Array<AddressModel>;
//     organizationCodes?: Array<CodesModel>;
//     organizationLabels?: Array<LabelModel>;
//     parents?: Array<HierarchyListModel>;
//     organizationNotes?: Array<NoteModel>;
//     supplier: SupplierModel;
//     activeSupplier ?= false;
//     repairer: RepairerModel;
//     activeRepairer ?= false;
//
//
//     setGeneralInfo(generalData: GeneralViewModel) {
//         this.shortName = generalData.generalInfo.ouShortName;
//         this.longName3 = generalData.generalInfo.ouLongName3;
//         this.longName2 = generalData.generalInfo.ouLongName2;
//         this.longName = generalData.generalInfo.ouLongName;
//         // this.ouStartDate= generalData.organizationalInfo.;
//         // this.ouEndDate? : string
//         // this.ouInactive? : false;
//         this.tenantId = generalData.organizationalInfo.ouTenantId;
//         this.organizationTypeId = generalData.organizationalInfo.ouOrganizationTypeId;
//         this.organizationApplications = generalData.organizationalInfo.organizationApplications;
//         this.vatNumber = generalData.financialInfo ? generalData.financialInfo.ouVatNumber : '';
//         this.noVatNumber = generalData.financialInfo ? generalData.financialInfo.ouNoVatNumber : false;
//         this.chamberOfCommerceNumber = generalData.financialInfo ? generalData.financialInfo.ouChamberOfCommerceNumber : '';
//     }
//
//
//     setOfficialAddress(officialAddres: AddressModel) {
//         this.officialAddress = officialAddres;
//     }
//     setPostalAddress(postalAddres: AddressModel) {
//         this.postalAddress = postalAddres;
//     }
//     setVisitAddress(visitAddres: AddressModel) {
//         this.visitAddress = visitAddres;
//     }
//     setSupplier(supplier: SupplierModel) {
//         this.supplier = supplier;
//     }
//     setRepairer(repairer: RepairerModel) {
//         this.repairer = repairer;
//     }
// }
