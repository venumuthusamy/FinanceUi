import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/toaster/toaster/toaster.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChartOfAccountService } from '../coa-service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-coa-list',
  templateUrl: './coa-list.component.html',
  styleUrls: ['./coa-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CoaListComponent {

  headervalue: any
  chartOfAccountList : any = []
  page: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page
  chartOfAccountName: string = '';
  filteredList: TreeNode[] = [];
  treeData: TreeNode[] = [];

  constructor(private formBuilder : FormBuilder,
    private router : Router,
    private chartOfAccountService : ChartOfAccountService,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ){

  }

  ngOnInit(){
    this.headervalue = 'Chart Of Account';
     this.chartOfAccountService.getChartOfAccount().subscribe((data :any) => {
            this.chartOfAccountList = data
            this.treeData = this.buildTree(this.chartOfAccountList);
      });         
  }
   buildTree(data: any[]): TreeNode[] {
  // Sort parents before children by code length
    data.sort((a, b) => a.headCode.toString().length - b.headCode.toString().length);

    const lookup: Record<string, TreeNode> = {};
    const roots: TreeNode[] = [];

    data.forEach(item => {
      const codeStr = item.headCode.toString();

      lookup[codeStr] = {
        data: {
          headCode: item.headCode,
          headName: item.headName,
          openingBalance: item.openingBalance ?? 0,
          balance: item.balance ?? 0,
          id:item.id
        },
        children: []
      };

      if (codeStr.length === 1) {
        // Top-level node
        roots.push(lookup[codeStr]);
      } else {
        // Find the longest matching parent code
        const parentCode = Object.keys(lookup)
          .filter(code => codeStr.startsWith(code) && code !== codeStr)
          .reduce((a, b) => (a.length > b.length ? a : b), '');

        if (parentCode) {
          lookup[parentCode].children?.push(lookup[codeStr]);
        }
      }
    });

    return roots;
  }

  createChartOfAccount(){
    this.router.navigateByUrl('financial/coa/create')
  }
  editChartOfAccount(item : any){
    this.router.navigateByUrl(`financial/coa/edit/${item.id}`)
  }
  deleteChartOfAccount(item : any){
    this.chartOfAccountService.deleteChartOfAccount(item.id).subscribe((res)=>{
      this.toast.showSuccess("Chart Of Account Details deleted successfully")
      this.ngOnInit()  
    })
  }
  filterChartOfAccount() {
      this.filteredList = this.buildTree(this.chartOfAccountList)
      if (this.chartOfAccountName) {
        this.filteredList = this.filteredList.filter((x: any) =>
          (!this.chartOfAccountName || x.data.headName.toLowerCase().includes(this.chartOfAccountName.toLowerCase())
           ||    
           x.children?.some((y: any) =>
           y.data.headName.toLowerCase().includes(this.chartOfAccountName.toLowerCase()) ||

           y.children?.some((z: any) =>
           z.data.headName.toLowerCase().includes(this.chartOfAccountName.toLowerCase())
          )
          ))
        );
      }
        this.treeData = this.filteredList;
        this.page = 1;
  }
  clearField(field: string) {
    if (field === 'chartOfAccountName') {
      this.chartOfAccountName = '';
    } 
    this.treeData = this.buildTree(this.chartOfAccountList);
  } 

  confirmdeleteChartOfAccount(item:any) {
        this.confirmationService.confirm({
          header: 'Confirm Delete',
          message: 'Are you sure you want to delete this item?',
          acceptLabel: 'Delete',
          rejectLabel: 'Cancel',
          rejectIcon: 'pi pi-times',
          accept: () => {
            this.deleteChartOfAccount(item);
          },
          reject: () => {
          }
        });
  }
}























