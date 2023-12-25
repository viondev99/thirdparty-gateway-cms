import React, { FC } from 'react'
import ReactDiffViewer from 'react-diff-viewer'
import { useTranslation } from 'react-i18next'

interface Props {
  oldValue?: any
  newValue?: any
}

const CompareJsonData: FC<Props> = ({ oldValue, newValue }) => {
  const { t } = useTranslation('actionLogHistory/detail')

  return (
    <div className='w-full'>
      <ReactDiffViewer
        oldValue={JSON.stringify(oldValue, undefined, 4)}
        newValue={JSON.stringify(newValue, undefined, 4)}
        splitView={true}
        leftTitle={t('oldValue')}
        rightTitle={t('newValue')}
        showDiffOnly={false}
        hideLineNumbers
      />
    </div>
  )
}

export default CompareJsonData
