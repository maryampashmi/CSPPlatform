'use strict';

angular.module('cspMetadataApp')
  .controller('PrivacyCtrl', ['$scope',
    function ($scope) {

      $scope.formFields = [{
        "key" : "p1",
        "type" : "radio",
        templateOptions : {
          "label" : "1. Does your organization allocate dedicated IP addresses to serve SSL content at each edge location?",
          "required" : true,
          "options" : [{
            "name" : "Yes",
            "value" : "yes"
          }, {
            "name" : "No",
            "value" : "no"
          }
          ]
        }
      }, {
        "key" : "p2",
        "type" : "radio",
        templateOptions : {
          "label" : "2. Does your firm allow multiple domains to serve SSL traffic over the same IP address?",
          "required" : true,
          "options" : [{
            "name" : "Yes",
            "value" : "yes"
          }, {
            "name" : "No",
            "value" : "no"
          }
          ]
        }
      }, {
        "key" : "p3",
        "type" : "radio",
        templateOptions : {
          "label" : "3. Does your organization support SSH connection (Secure Shell) for the customers?",
          "required" : true,
          "options" : [{
            "name" : "Yes",
            "value" : "yes"
          }, {
            "name" : "No",
            "value" : "no"
          }
          ]
        }
      }, {
        "key" : "p4",
        "type" : "radio",
        templateOptions : {
          "label" : "4. Does your organization provide data encryption for the customers?",
          "required" : true,
          "options" : [{
            "name" : "Yes",
            "value" : "yes"
          }, {
            "name" : "No",
            "value" : "no"
          }
          ]
        }
      },{
        "key" :"P4hiddenWhenUnchecked",
        "type" : "well-multi-checkbox",
        templateOptions : {
          "label" : "5. At what stage is the data encrypted?",
          "required" : true,
          "options": [
            {
              "name": "In storage",
              "value": "inStorage"
            },
            {
              "name": "During transmission",
              "value": "transmitOverIE"
            },
            {

              "name": "Other",
              "value": "Other"
            }
          ]
        },
        hideExpression: "model.S4 !== 'yes'"
      },{
        "key": "P4hiddenWhenUncheckedOther",
        "type": "well-text",
        templateOptions : {
          "label": "Please write down if your company is using other types of data encryption?",
        },
        hideExpression: "!model.P4hiddenWhenUnchecked.Other"
      },{
        "key" : "p5",
        "type" : 'multi-checkbox',
        "templateOptions" : {
          "label" : "5. Which of the certificates that guarantee physical security are held by organization?",
          "options" : [{
            "name": "SOC 1",
            "value": "SOC1"
          },
            {
              "name": "SOC 2",
              "value": "SOC2"
            },
            {
              "name": "SOC 3",
              "value": "SOC3"
            },
            {
              "name": "ISO 9001",
              "value": "ISO9001"
            },
            {
              "name": "ISO 27002",
              "value": "ISO27002"
            },
            {
              "name": "ISO 27001",
              "value": "ISO27001"
            },
            {
              "name": "PCI DSS",
              "value": "PCIDSS"
            },
            {
              "name": "HIPAA",
              "value": "HIPAA"
            },
            {
              "name": "CONTENT PROTECTION AND SECURITY STANDARD(CSP)",
              "value": "CSP"
            },
            {
              "name": "SAFE HARBOR",
              "value": "SAFEHARBOR"
            },
            {

              "name": "other",
              "value": "other"
            }
          ]
        }
      },{
        "key": "P5other",
        "type": "well-text",
        templateOptions : {
          "label": "Please write any other certifications that you have?",
        },
        hideExpression: "!model.P5.other"
      },{
        key: 'P6',
        type: 'textarea',
        templateOptions: {
          label: "6. What sort of firewalls and detection systems are in operation to guard against malicious network activity or system attacks?",
          //placeholder: 'This has 10 rows',
          "description": "Please enter sort of firewalls and detection systems which your company use in the separate line.",
          rows: 5
        }
      },{
        "key" :"P7",
        "type": "radio",
        templateOptions: {
          "label": "7. Does your organization consider incident response plan in case of the aftermath of a security breach or attack?",
          "description":"An incident response plan is a general plan for dealing with any number of crises that could negatively impact your business.",
          "options": [
            {
              "name": "Yes",
              "value": "yes"
            },
            {
              "name": "No",
              "value": "no"
            }
          ]
        }
      },{
        "key" :"P8",
        "type": "radio",
        templateOptions: {
          "label": "8. Does your organization allow customers to implement their own security architecture?",
          "options": [
            {
              "name": "Yes",
              "value": "yes"
            },
            {
              "name": "No",
              "value": "no"
            }
          ]
        }
      },{
        "key" :"P9",
        "type": "radio",
        templateOptions: {
          "label": "9. Does your organization allow customers to implement their own security architecture?",
          "options": [
            {
              "name": "Yes",
              "value": "yes"
            },
            {
              "name": "No",
              "value": "no"
            }
          ]
        }
      },{
        "key" :"P10",
        "type": "radio",
        templateOptions: {
          "label": "9.  Does your organization allow customers to secure and manage access from clients such as PC and mobile devices?",
          "options": [
            {
              "name": "Yes",
              "value": "yes"
            },
            {
              "name": "No",
              "value": "no"
            }
          ]
        }
      },{
        key: 'P11',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: "11. What has been total average downtime for the last three month in percentage?",
          "placeholder": "95"

        }
      },{
        key: 'P12',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: "12. What has been total average downtime for the last six month in percentage?",
          "placeholder": "95"

        }
      },{
        key: 'P13',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: "13. What has been total average downtime for the last one year in percentage?",
          "placeholder": "94"

        }
      }, {
        "key" : "p14",
        "type" : "radio",
        templateOptions : {
          "label" : "14. Are all the cloud services available in all the regions?",
          "options" : [{
            "name" : "Yes",
            "value" : "yes"
          }, {
            "name" : "No",
            "value" : "no"
          }
          ],
          "description": "if your answer is negative,"
        }
      },{
        "key" :"hiddenWhenUnchecked",
        "type" : "well-text",
        templateOptions : {
          "label": "Please mention all the cloud services which has limited region availability?",
          "placeholder": "Ec2",

        },
        hideExpression: "model.S14 !== 'no'"
      }
      ];


    }]);
