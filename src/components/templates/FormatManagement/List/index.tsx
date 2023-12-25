import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { CoreInputCustom } from '@/components/atoms/custom/CoreInputCustom/CoreInputCustom'
import { SelectDropdown } from '@/components/atoms/custom/SelectDropdown.tsx'
import { CustomTable } from '@/components/organism/TableCustom'
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useList } from './useList'
import Grid from '@mui/material/Grid'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import React from 'react'
import { useConstant } from "@/constants/useConstant";
import { useSortTable } from "@/components/hooks/sort-table.ts";
import { FormatPathUrl } from "../FormatPathUrl";

export const List = () => {
  const [values, handles] = useList();
  const { t, tCommon, control,
    tableData, columns, router,
    totalPages, page, size, isLoading, setValue,
  } = values;
  const { onSubmit,
    onChangePageSize,
    onDoubleClick, onChangeSort } = handles;

  const { columnsSort, resetSort } = useSortTable(columns, ['code', 'createdAt'], [], onChangeSort);

  const { OPTIONS_FORMAT_STATUS } = useConstant();

  return (<>
    <PageContainer
      title={
        <>
          <Typography variant='h3' gutterBottom>
            {t('title_header')}
          </Typography>
          <div className='flex justify-center'>
            <ButtonCustom
              style={{ marginLeft: 20 }}
              height={36}
              variant='contained'
              color='primary'
              className='px-8 py-6'
              theme='submit'
              onClick={() => {
                router.push(FormatPathUrl.NEW)
              }}
            >
              {tCommon('addNew')}
            </ButtonCustom>
          </div>
        </>
      }
    >
      <div className='block max-w-[1000px] mx-auto'>
        <div className='flex justify-between'>
          <Typography variant='h3' gutterBottom style={{ marginBottom: 24 }}>
            {tCommon('searchByFilter')}
          </Typography>
        </div>
        <div>
          <form className='grid grid-cols-1 gap-10'>
            <div className='grid grid-cols-3 gap-10'>
              <div>
                <CoreInputCustom
                  placeholder={tCommon('placeholder_search', { field: t('code') })}
                  onClickClose={() => {
                    setValue('code', '');
                  }}
                  onBlur={(event: any) => {
                    if (event?.target?.value?.trim()) {
                      setValue('code', event?.target?.value.trim());
                    }
                  }} label={t('code')} control={control} name={'code'} />
              </div>
              <div>
                <SelectDropdown noOptionsText={tCommon('no_result_found')} options={OPTIONS_FORMAT_STATUS} label={t('status')} control={control} name={'status'} />
              </div>
            </div>
            <div className='flex justify-center gap-10' style={{ marginBottom: 24, marginTop: 15 }}>
              <ButtonCustom
                theme='submit'
                onClick={onSubmit(resetSort)}
                textTransform='none'
                width={134} height={43}
                disabled={isLoading}
              >
                {tCommon('search')}
              </ButtonCustom>
            </div>
          </form>
        </div>
      </div>
      <div className='block max-w-[1000px] mx-auto'>
        <div className='flex justify-between' style={{ marginBottom: 12 }}>
          <Typography variant='h3' gutterBottom>
            {t('search_result')}
          </Typography>
        </div>
        <Grid>
          {tableData && (
            <CustomTable
              columns={columns}
              data={tableData}
              onChangePageSize={onChangePageSize}
              paginationHidden={tableData.length < 1}
              totalPages={totalPages}
              page={page}
              size={size}
              onDoubleClick={(row: any, index: number) => onDoubleClick(row)}
              isLoading={isLoading}
            />
          )}
        </Grid>
      </div>
    </PageContainer>
  </>
  )
}
