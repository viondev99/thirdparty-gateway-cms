import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { FromToRangeWidget } from '@/components/widgets/FromToRangeWidget'
import { GroupByWidget } from '@/components/widgets/GroupByWidget'
import { InternalSystemWidget } from '@/components/widgets/InternalSystemWidget'
import { ServicesWidget } from '@/components/widgets/ServicesWidget'
import { ThirdPartyWidget } from '@/components/widgets/ThirdPartyWidget'
import { TypeWidget } from '@/components/widgets/TypeWidget'
import { Grid, Typography } from '@mui/material'
import { ActionType } from './action.type'
import { useTotalSummaryReport } from './useTotalSummaryReport'
import Link from 'next/link'

type Props = {
  action?: ActionType
}
export const TotalSummaryReport = ({ action = 'view' }: Props) => {
  const [
    {
      t,
      isLoading,
      tCommon,
      tableData,
      columns,
      totalPages,
      page,
      size,
      control,
      setValue,
    },
    { onChangePageSize, onSubmit, onExportExcel },
  ] = useTotalSummaryReport(action)

  return (
    <>
      <PageContainer
        title={
          <>
            <Typography variant='h3' gutterBottom>
              {t('title_header')}
            </Typography>
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
              <div className='grid xs:grid-cols-1 sm:grid-cols-3 gap-10'>
                <div>
                  <FromToRangeWidget
                    fromName='fromDate'
                    toName='toDate'
                    control={control}
                    setValue={setValue}
                  />
                </div>
                <div>
                  <TypeWidget
                    name='thirdPartyTypeId'
                    control={control}
                    setValue={setValue}
                  />
                </div>
                <div>
                  <ThirdPartyWidget
                    name='thirdPartyId'
                    control={control}
                    setValue={setValue}
                  />
                </div>
                <div>
                  <ServicesWidget
                    name='thirdPartyServiceId'
                    control={control}
                    setValue={setValue}
                  />
                </div>
                <div>
                  <InternalSystemWidget
                    name='internalSystemId'
                    control={control}
                    setValue={setValue}
                  />
                </div>
                <div>
                  <GroupByWidget
                    name='groupBy'
                    control={control}
                    setValue={setValue}
                  />
                </div>
              </div>
              <div
                className='flex justify-center gap-10'
                style={{ marginBottom: 24, marginTop: 15 }}
              >
                <ButtonCustom
                  theme='submit'
                  onClick={onSubmit}
                  textTransform='none'
                  width={134}
                  height={43}
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
            <div className='relative'>
              <button
                type='button'
                onClick={onExportExcel}
                disabled={isLoading}
                className='text-[#4cb3e4] border-none underline cursor-pointer hover:text-[#78c6ec]'
                style={{
                  background: 'none',
                  fontSize: '18px'
                }}
              >
                {t('export_excel')}
              </button>
            </div>
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
                // onDoubleClick={(row: any, index: number) => onDoubleClick(row)}
                isLoading={isLoading}
              />
            )}
          </Grid>
        </div>
      </PageContainer>
    </>
  )
}
