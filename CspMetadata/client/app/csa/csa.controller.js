'use strict';

angular.module('cspMetadataApp')
  .controller('CsaCtrl', function ($scope) {
    $scope.data = {
      name: "certificates",
      id: "cert-root",
      children: [{
          name: "ISO",
          id: "cert-iso",
          children: [
          {id:"CO-01", //this is for all
            name:"CO-AuditPlanning",
              children: [{
                id: "CO-01.1",
                name: "CO-AuditPlanning.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }]
          },{id:"CO-02",name:"CO-IndependentAudits",children: [{
              id : "CO-02.1",
              name : "CO-IndependentAudits.1",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }, {
              id : "CO-02.2",
              name : "CO-IndependentAudits.2",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }, {
              id : "CO-02.3",
              name : "CO-IndependentAudits.3",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }, {
              id : "CO-02.4",
              name : "CO-IndependentAudits.4",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }, {
              id : "CO-02.5",
              name : "CO-IndependentAudits.5",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }, {
              id : "CO-02.6",
              name : "CO-IndependentAudits.6",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }, {
              id : "CO-02.7",
              name : "CO-IndependentAudits.7",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }
            ]},
            {id:"CO-03",name:"CO-ThirdPartyAudits",children: [{
              id : "CO-03.1",
              name : "CO-ThirdPartyAudits.1",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }, {
              id : "CO-03.2",
              name : "CO-ThirdPartyAudits.2",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }]},
            {id:"CO-04",name:"CO-Contact",children : [{
              id : "CO-04.1",
              name : "CO-Contact.1",
              children: [{
                id: "softlayer",
                name: "Soft Layter"
              }]
            }
            ]},
            {id:"CO-05",name:"CO-InformationSystemRegulatoryMapping",
              children : [{
                id : "CO-05.1",
                name : "CO-InformationSystemRegulatoryMapping.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "CO-05.2",
                name : "CO-InformationSystemRegulatoryMapping.2",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"CO-06",name:"CO-IntellectualProperty",
              children : [{
                id : "CO-06.1",
                name : "CO-IntellectualProperty1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"DG-01",name:"DG-Ownership"},
            {id:"DG-02",name:"DG-Classification",
              children : [{
                id : "DG-02.1",
                name : "DG-Classification.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                },{
                  id: "mmmm",
                  name: "mmmmm"  //this is an example when is growing nu,ber of providers is growing vertically
                }
                ]
              }, {
                id : "DG-02.2",
                name : "DG-Classification.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "DG-02.4",
                name : "DG-Classification.4",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "DG-02.5",
                name : "DG-Classification.5",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"DG-03",name:"DG-Handling",
              children : [{
                id : "DG-03.1",
                name : "DG-Handling.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "DG-03.2",
                name : "DG-Handling.2",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"DG-04",name:"DG-RetentionPolicy",
              children : [{
                id : "DG-04.2",
                name : "DG-RetentionPolicy.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"DG-05",name:"DG-SecureDisposal",
              children : [{
                id : "DG-05.2",
                name : "DG-SecureDisposal.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"DG-06",name:"DG-NonProductionData",
              children : [{
                id : "DG-06.1",
                name : "DG-NonProductionData.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"DG-07",name:"DG-InformationLeakage",
              children : [{
                id : "DG-07.1",
                name : "DG-InformationLeakage.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "DG-07.2",
                name : "DG-InformationLeakage.2",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"DG-08",name:"DG-RiskAssessments",
              children : [{
                id : "DG-08.1",
                name : "DG-RiskAssessments.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"FS-01",name:"FS-Policy",
              children : [{
                id : "FS-01.1",
                name : "FS-Policy.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"FS-02",name:"FS-UserAccess",
              children : [{
                id : "FS-02.1",
                name : "FS-UserAccess.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"FS-03",name:"FS-ControlledAccessPoints",
              children : [{
                id : "FS-03.1",
                name : "FS-ControlledAccessPoints.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"FS-04",name:"FS-SecureAreaAuthorization",
              children : [{
                id : "FS-04.1",
                name : "FS-SecureAreaAuthorization.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"FS-05",name:"FS-UnauthorizedPersonsEntry",
              children : [{
                id : "FS-05.1",
                name : "FS-UnauthorizedPersonsEntry.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"FS-06",name:"FS-OffSiteAuthorization"},
            {id:"FS-07",name:"FS-OffSiteEquipment",
              children : [{
                id : "FS-07.1",
                name : "FS-OffSiteEquipment.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"FS-08",name:"FS-AssetManagement",
              children : [{
                id : "FS-08.1",
                name : "FS-AssetManagement.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "FS-08.2",
                name : "FS-AssetManagement.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"HR-01",name:"HRS-BackgroundScreening",
              children : [{
                id : "HR-01.1",
                name : "HRS-BackgroundScreening.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"HR-02",name:"HRS-EmploymentAgreements",
              children : [{
                id : "HR-02.1",
                name : "HRS-EmploymentAgreements.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "HR-02.2",
                name : "HRS-EmploymentAgreements.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"HR-03",name:"HR-EmploymentTermination",
              children : [{
                id : "HR-03.1",
                name : "HR-EmploymentTermination.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-01",name:"IS-ManagementProgram"},
            {id:"IS-02",name:"IS-ManagementSupport",
              children : [{
                id : "IS-02.1",
                name : "IS-ManagementSupport.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-03",name:"IS-Policy",
              children : [{
                id : "IS-03.1",
                name : "IS-Policy.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              },{
                id : "IS-03.2",
                name : "IS-Policy.2",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              },{
                id : "IS-03.3",
                name : "IS-Policy.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-04",name:"IS-BaselineRequirements",
              children : [{
                id : "IS-04.1",
                name : "IS-BaselineRequirements.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-04.2",
                name : "IS-BaselineRequirements.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-04.3",
                name : "IS-BaselineRequirements.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-05",name:"IS-PolicyReviews"},
            {id:"IS-06",name:"IS-PolicyEnforcement",
              children : [{
                id : "IS-06.1",
                name : "IS-PolicyEnforcemen.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-06.2",
                name : "IS-PolicyEnforcemen.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-07",name:"IS-UserAccessPolicy",
              children : [{
                id : "IS-07.1",
                name : "IS-UserAccessPolicy.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-08",name:"IS-UserAccessRestriction",
              children : [{
                id : "IS-08.1",
                name : "IS-UserAccessRestriction.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-09",name:"IS-UserAccessRevocation",
              children : [{
                id : "IS-09.1",
                name : "IS-UserAccessRevocation.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-09.2",
                name : "IS-UserAccessRevocation.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-10",name:"IS-UserAccessReviews",
              children : [{
                id : "IS-10.1",
                name : "IS-UserAccessReviews.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-10.2",
                name : "IS-UserAccessReviews.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-10.3",
                name : "IS-UserAccessReviews.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-11",name:"IS-Training/Awareness",
              children : [{
                id : "IS-11.1",
                name : "IS-Training/Awareness.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              },{
                id : "IS-11.2",
                name : "IS-Training/Awareness.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-12",name:"IS-IndustryKnowledge",
              children : [{
                id : "IS-12.1",
                name : "IS-IndustryKnowledge.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-12.2",
                name : "IS-IndustryKnowledge.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-13",name:"IS-Roles",
              children : [{
                id : "IS-13.1",
                name : "IS-Roles.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-14",name:"IS-ManagementOversight",
              children : [{
                id : "IS-14.1",
                name : "IS-ManagementOversight.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-15",name:"IS-SegregationofDuties"},
            {id:"IS-16",name:"IS-UserResponsibility",
              children : [{
                id : "IS-16.1",
                name : "IS-UserResponsibility.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-16.2",
                name : "IS-UserResponsibility.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-16.3",
                name : "IS-UserResponsibility.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-17",name:"IS-Workspace",
              children : [{
                id : "IS-17.2",
                name : "IS-Workspace.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-18",name:"IS-Encryption",
              children : [{
                id : "IS-18.1",
                name : "IS-Encryption.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-18.2",
                name : "IS-Encryption.2",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-19",name:"IS-EncryptionKeyManagement",
              children : [{
                id : "IS-19.1",
                name : "IS-EncryptionKeyManagement.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-19.2",
                name : "IS-EncryptionKeyManagement.2",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-19.3",
                name : "IS-EncryptionKeyManagement.3",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-19.4",
                name : "IS-EncryptionKeyManagement.4",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-20",name:"IS-Vulnerability",
              children : [{
                id : "IS-20.1",
                name : "IS-Vulnerability.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-20.2",
                name : "IS-Vulnerability.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-20.3",
                name : "IS-Vulnerability.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-20.4",
                name : "IS-Vulnerability.4",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-20.5",
                name : "IS-Vulnerability.5",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-21",name:"IS-Anti-Virus",
              children : [{
                id : "IS-21.1",
                name : "IS-Anti-Virus.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-21.2",
                name : "IS-Anti-Virus.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-22",name:"IS-IncidentManagement",
              children : [{
                id : "IS-22.1",
                name : "IS-IncidentManagement.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-22.3",
                name : "IS-IncidentManagement.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-23",name:"IS-IncidentReporting",
              children : [{
                id : "IS-23.1",
                name : "IS-IncidentReporting.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-23.2",
                name : "IS-IncidentReporting.2",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-24",name:"IS-IncidentResponseLegalPreparation",
              children : [{
                id : "IS-24.1",
                name : "IS-IncidentResponseLegalPreparation.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-24.2",
                name : "IS-IncidentResponseLegalPreparation.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-24.3",
                name : "IS-IncidentResponseLegalPreparation.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-24.4",
                name : "IS-IncidentResponseLegalPreparation.4",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-25",name:"IS-IncidentResponseMetrics",
              children : [{
                id : "IS-25.1",
                name : "IS-IncidentResponseMetrics.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-25.2",
                name : "IS-IncidentResponseMetrics.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-26",name:"IS-AcceptableUse",
              children : [{
                id : "IS-26.1",
                name : "IS-AcceptableUse.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"IS-27",name:"IS-AssetReturns",
              children : [{
                id : "IS-27.1",
                name : "IS-AssetReturns.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-27.2",
                name : "IS-AssetReturns.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-28",name:"IS-eCommerceTransactions",
              children : [{
                id : "IS-28.1",
                name : "IS-eCommerceTransactions.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-28.2",
                name : "IS-eCommerceTransactions.2",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-29",name:"IS-AuditToolsAccess",
              children : [{
                id : "IS-29.1",
                name : "IS-AuditToolsAccess.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-30",name:"IS-Diagnostic",
              children : [{
                id : "IS-30.1",
                name : "IS-Diagnostic.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-31",name:"IS-Network",
              children : [{
                id : "IS-31.1",
                name : "IS-Network.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-31.2",
                name : "IS-Network.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-32",name:"IS-Portable",
              children : [{
                id : "IS-32.1",
                name : "IS-Portable.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-33",name:"IS-SourceCodeAccessRestriction",
              children : [{
                id : "IS-33.1",
                name : "IS-SourceCodeAccessRestriction.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-33.2",
                name : "IS-SourceCodeAccessRestriction.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"IS-34",name:"IS-UtilityProgramsAccess",
              children : [{
                id : "IS-34.1",
                name : "IS-UtilityProgramsAccess.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "IS-34.2",
                name : "IS-UtilityProgramsAccess.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "IS-34.3",
                name : "IS-UtilityProgramsAccess.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"LG-01",name:"L-Non-DisclosureAgreements",
              children : [{
                id : "LG-01.1",
                name : "L-Non-DisclosureAgreements.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"LG-02",name:"L-ThirdPartyAgreements",
              children : [{
                id : "LG-02.1",
                name : "L-ThirdPartyAgreements.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "LG-02.2",
                name : "L-ThirdPartyAgreements.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "LG-02.3",
                name : "L-ThirdPartyAgreements.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"OP-01",name:"OM-Policy",
              children : [{
                id : "OP-01.1",
                name : "OM-Policy.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"OP-02",name:"OM-Documentation",
              children : [{
                id : "OP-02.1",
                name : "OM-Documentation.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"OP-03",name:"OM-Capacity",
              children : [{
                id : "OP-03.2",
                name : "OM-Capacity.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"OP-04",name:"OM-EquipmentMaintenance",
              children : [{
                id : "OP-04.1",
                name : "OM-EquipmentMaintenance.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "OP-04.5",
                name : "OM-EquipmentMaintenance.5",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"RI-01",name:"RM-Program",
              children : [{
                id : "RI-01.1",
                name : "RM-Program.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "RI-01.2",
                name : "RM-Program.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"RI-02",name:"RM-Assessments",
              children : [{
                id : "RI-02.1",
                name : "RM-Assessments.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "RI-02.2",
                name : "RM-Assessments.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"RI-03",name:"RM-Mitigation",
              children : [{
                id : "RI-03.1",
                name : "RM-Mitigation.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "RI-03.2",
                name : "RM-Mitigation.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"RI-04",name:"RM-Business",
              children : [{
                id : "RI-04.1",
                name : "RM-Business.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"RI-05",name:"RM-ThirdPartyAccess",
              children : [{
                id : "RI-05.1",
                name : "RM-ThirdPartyAccess.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "RI-05.2",
                name : "RM-ThirdPartyAccess.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "RI-05.3",
                name : "RM-ThirdPartyAccess.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "RI-05.4",
                name : "RM-ThirdPartyAccess.4",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              },{
                id : "RI-05.5",
                name : "RM-ThirdPartyAccess.5",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "RI-05.6",
                name : "RM-ThirdPartyAccess.6",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              },{
                id : "RI-05.7",
                name : "RM-ThirdPartyAccess.7",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"RM-01",name:"ReM-NewDevelopment",
              children : [{
                id : "RM-01.1",
                name : "ReM-NewDevelopment.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"RM-02",name:"ReM-ProductionChanges",
              children : [{
                id : "RM-02.1",
                name : "ReM-ProductionChanges.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"RM-03",name:"ReM-QualityTesting"},
            {id:"RM-04",name:"ReM-OutsourcedDevelopment",
              children : [{
                id : "RM-04.1",
                name : "ReM-OutsourcedDevelopment.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"RM-05",name:"ReM-UnauthorizedSoftwareInstallations",
              children : [{
                id : "RM-05.1",
                name : "ReM-UnauthorizedSoftwareInstallations.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"RS-01",name:"R-ManagementProgram",
              children : [{
                id : "RS-01.1",
                name : "R-ManagementProgram.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"RS-02",name:"R-ImpactAnalysis",
              children : [{
                id : "RS-02.1",
                name : "R-ImpactAnalysis.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "RS-02.3",
                name : "R-ImpactAnalysis.3",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"RS-03",name:"R-BusinessContinuityPlanning",
              children : [{
                id : "RS-03.1",
                name : "R-BusinessContinuityPlanning.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              },{
                id : "RS-03.2",
                name : "R-BusinessContinuityPlanning.2",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"RS-04",name:"R-BusinessContinuityTesting",
              children : [{
                id : "RS-04.1",
                name : "R-BusinessContinuityTesting.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"RS-05",name:"R-EnvironmentalRisks",
              children : [{
                id : "RS-05.1",
                name : "R-EnvironmentalRisks.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"RS-06",name:"R-EquipmentLocation",
              children : [{
                id : "RS-07.1",
                name : "R-EquipmentPowerFailures.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"RS-07",name:"R-EquipmentPowerFailures",
              children : [{
                id : "RS-07.1",
                name : "R-EquipmentPowerFailures.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }]
            },
            {id:"RS-08",name:"R-Power",
              children : [{
                id : "RS-08.1",
                name : "R-Power.1",
                children: [{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }
              ]},
            {id:"SA-01",name:"SA-CustomerAccessRequirements",
              children : [{
                id : "SA-01.1",
                name : "SA-CustomerAccessRequirements.1" ,
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }]
            },
            {id:"SA-02",name:"SA-UserIDCredentials",
              children: [{
                id: " SA - 02.1 ",
                name:" SA - UserIDCredentials.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              },{
              id: " SA - 02.2 ",
              name:" SA - UserIDCredentials.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              },{
              id: " SA - 02.3 ",
              name:" SA - UserIDCredentials.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              },{
              id: " SA - 02.4 ",
              name:" SA - UserIDCredentials.4",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              },{
              id: " SA - 02.5 ",
              name:" SA - UserIDCredentials.5",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              },{
              id: " SA - 02.6 ",
              name:" SA - UserIDCredentials.6",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }]
            },
            {id:"SA-03",name:"SA-DataSecurity/Integrity",
              children: [{
                id: " SA - 03.1 ",
                name:" SA - DataSecurity / Integrity.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }]},
            {id:"SA-04",name:"SA-ApplicationSecurity",
              children: [{
                id: " SA - 04.1 ",
                name:" SA - ApplicationSecurity.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]},
                {
                  id: " SA - 04.2 ",
                  name:" SA - ApplicationSecurity.2 ",
                  children: [{
                    id: "softlayer",
                    name: "Soft Layter"
                  },{
                    id: "Aryaka",
                    name: "Aryaka"
                  }]
                }, {
                  id : "SA-04.3",
                  name : "SA-ApplicationSecurity.3",
                  children: [{
                    id: "Aryaka",
                    name: "Aryaka"
                  }]
                }]
            },
            {id:"SA-05",name:"SA-DataIntegrity",
              children: [{
                id: " SA - 05.1 ",
                name:" SA - DataIntegrity.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }]
            },
            {id:"SA-06",name:"SA-Production",
              children: [{
                id: " SA - 06.1 ",
                name:" SA - Production.1 ",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }]
            },
            {id:"SA-07",name:"SA-RemoteUserMulti",
              children: [{
                id: " SA - 07.1 ",
                name:" SA - RemoteUserMulti.1 ",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }]
            },
            {id:"SA-08",name:"SA-NetworkSecurity"},
            {id:"SA-09",name:"SA-Segmentation",
              children: [{
                id: " SA - 09.1 ",
                name:" SA - Segmentation.1 ",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }
                ]},
                {
                  id: " SA - 09.2 ",
                  name:" SA - Segmentation.2 ",
                  children: [{
                    id: "softlayer",
                    name: "Soft Layter"
                  },{
                    id: "Aryaka",
                    name: "Aryaka"
                  }]},
                {  id: " SA - 09.3 ",
                  name:" SA - Segmentation.3",
                  children: [{
                    id: "softlayer",
                    name: "Soft Layter"
                  },{
                    id: "Aryaka",
                    name: "Aryaka"
                  }]
                }]
            },
            {id:"SA-10",name:"SA-WirelessSecurity",
              children: [{  id: " SA - 10.1 ",
                name:" SA - WirelessSecurity.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]},
                {  id: " SA - 10.2 ",
                  name:" SA - WirelessSecurity.2",
                  children: [{
                    id: "softlayer",
                    name: "Soft Layter"
                  },{
                    id: "Aryaka",
                    name: "Aryaka"
                  }]},
                {  id: " SA - 10.3 ",
                  name:" SA - WirelessSecurity.3",
                  children: [{
                    id: "softlayer",
                    name: "Soft Layter"
                  }]}
              ]},
            {id:"SA-11",name:"SA-SharedNetworks"},
            {id:"SA-12",name:"SA-ClockSynchronization",
              children: [{
                id: " SA - 12.1 ",
                name:" SA - ClockSynchronization.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }]
            },
            {id:"SA-13",name:"SA-EquipmentIdentification",
              children : [{
                id : "SA-13.1",
                name : "SA-EquipmentIdentification.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }]
            },
            {id:"SA-14",name:"SA-AuditLogging/IntrusionDetection",
              children : [{
                id : "SA-14.1",
                name : "SA-AuditLogging/IntrusionDetection.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "SA-14.2",
                name : "SA-AuditLogging/IntrusionDetection.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                },{
                  id: "Aryaka",
                  name: "Aryaka"
                }]
              }, {
                id : "SA-14.3",
                name : "SA-AuditLogging/IntrusionDetection.3",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]},
            {id:"SA-15",name:"SA-MobileCode",
              children : [{
                id : "SA-15.1",
                name : "SA-MobileCode.1",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }, {
                id : "SA-15.2",
                name : "SA-MobileCode.2",
                children: [{
                  id: "softlayer",
                  name: "Soft Layter"
                }]
              }
              ]}
          ]}
      ]}
  })
