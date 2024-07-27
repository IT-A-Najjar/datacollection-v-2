import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useGridApiContext } from '@mui/x-data-grid';
import { saveAs } from 'file-saver';

function CustomToolbar(props) {
  const apiRef = useGridApiContext();

  const handleExport = (options) => {
    const csvString = apiRef.current.getDataAsCsv(options);
    const utf8Bom = '\uFEFF'; // UTF-8 BOM
    const csvWithBom = utf8Bom + csvString;
    const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, props.name || 'default_filename.csv');
  };

  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          fileName: props.name || 'default_filename',
          utf8WithBom: true
        }}
        printOptions={{ disableToolbarButton: true }}
        onExport={() => handleExport({ delimiter: ',' })}
      />
    </GridToolbarContainer>
  );
}

export default function DataTable(props) {
  return (
    <div style={{ height: 406.4, width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={props.row}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        checkboxSelection 
        pageSizeOptions={[5, 10, 100]}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{ toolbar: { name: props.name } }}
        localeText={{
          columnMenuLabel: 'قائمة الأعمدة',
          columnMenuSortAsc: 'ترتيب تصاعدي',
          columnMenuSortDesc: 'ترتيب تنازلي',
          columnMenuFilter: 'تصفية',
          columnMenuHideColumn: 'إخفاء العمود',
          columnMenuShowColumns: 'إظهار الأعمدة',
          columnMenuUnsort: 'إلغاء الترتيب',
          columnMenuManageColumns: 'إدارة الأعمدة',
          toolbarDensity: 'كثافة',
          toolbarDensityLabel: 'كثافة',
          toolbarDensityCompact: 'مضغوط',
          toolbarDensityStandard: 'قياسي',
          toolbarDensityComfortable: 'مريح',
          toolbarFilters: 'التصفيات',
          toolbarFiltersLabel: 'التصفيات',
          toolbarFiltersTooltipHide: 'إخفاء التصفيات',
          toolbarFiltersTooltipShow: 'إظهار التصفيات',
          toolbarFiltersTooltipActive: count => `${count} تصفية/تصفية نشطة`,
          toolbarColumns: 'الأعمدة',
          toolbarColumnsLabel: 'الأعمدة',
          toolbarColumnsTooltipHide: 'إخفاء الأعمدة',
          toolbarColumnsTooltipShow: 'إظهار الأعمدة',
          toolbarExport: 'تصدير',
          toolbarExportLabel: 'تصدير',
          toolbarExportCSV: 'تصدير كملف CSV',
          toolbarExportPrint: 'طباعة',
          filterPanelAddFilter: 'إضافة تصفية',
          filterPanelRemoveAll: 'إزالة الكل',
          filterPanelDeleteIconLabel: 'حذف',
          filterPanelLogicOperator: 'عامل التشغيل المنطقي',
          filterPanelOperator: 'عامل التشغيل',
          filterPanelOperatorAnd: 'و',
          filterPanelOperatorOr: 'أو',
          filterPanelColumns: 'الأعمدة',
          filterPanelInputLabel: 'القيمة',
          filterPanelInputPlaceholder: 'تصفية حسب القيمة',
          filterOperatorContains: 'يحتوي',
          filterOperatorEquals: 'يساوي',
          filterOperatorStartsWith: 'يبدأ بـ',
          filterOperatorEndsWith: 'ينتهي بـ',
          filterOperatorIs: 'هو',
          filterOperatorNot: 'ليس',
          filterOperatorAfter: 'بعد',
          filterOperatorOnOrAfter: 'في أو بعد',
          filterOperatorBefore: 'قبل',
          filterOperatorOnOrBefore: 'في أو قبل',
          filterOperatorIsEmpty: 'فارغ',
          filterOperatorIsNotEmpty: 'غير فارغ',
          filterOperatorIsAnyOf: 'أي من',
          filterValueAny: 'أي',
          filterValueTrue: 'صحيح',
          filterValueFalse: 'خطأ',
          toolbarQuickFilterPlaceholder: 'بحث...',
          toolbarQuickFilterLabel: 'بحث',
          toolbarQuickFilterDeleteIconLabel: 'أزال',
          // Rows selected footer text
          footerRowSelected: (count) =>
            count !== 1 ? `تم تحديد ${count.toLocaleString()} من الصفوف` : `تم تحديد صف واحد`,

          // Total row amount footer text
          footerTotalRows: 'إجمالي الصفوف:',
        }}
      />
    </div>
  );
}
