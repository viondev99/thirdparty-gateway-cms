import { IconButton } from '@mui/material'
import Image from 'next/image'

type Action =
  | 'delete'
  | 'watch'
  | 'edit'
  | 'add'
  | 'download'
  | 'lock'
  | 'unlock'
  | 'sync'
  | 'search'

type Props = {
  actionList: Action[]
  onWatchAction?: () => void
  onDeleteAction?: () => void
  onEditAction?: () => void
  onAddAction?: () => void
  onDownloadAction?: () => void
  onLockAction?: () => void
  onUnlockAction?: () => void
  onSyncAction?: () => void
  onSearchAction?: () => void
}

export const Action = ({
  actionList,
  onWatchAction,
  onDeleteAction,
  onEditAction,
  onAddAction,
  onDownloadAction,
  onLockAction,
  onUnlockAction,
  onSyncAction,
  onSearchAction,
}: Props) => {
  return (
    <div className='flex items-center justify-center'>
      {actionList.includes('lock') && (
        <IconButton onClick={onLockAction}>
          <Image
            src={require('@/assets/svg/lock.svg')}
            alt='lock'
            width={22}
            height={22}
          />
        </IconButton>
      )}
      {actionList.includes('unlock') && (
        <IconButton onClick={onUnlockAction}>
          <Image
            src={require('@/assets/svg/unlock.svg')}
            alt='unlock'
            width={22}
            height={22}
          />
        </IconButton>
      )}
      {actionList.includes('download') && (
        <IconButton onClick={onDownloadAction}>
          <Image
            src={require('@/assets/svg/download.svg')}
            alt='download'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('sync') && (
        <IconButton onClick={onSyncAction}>
          <Image
            src={require('@/assets/svg/sync.svg')}
            alt='sync'
            width={22}
            height={22}
          />
        </IconButton>
      )}

      {actionList.includes('watch') && (
        <IconButton onClick={onWatchAction}>
          <Image
            src={require('@/assets/svg/iconEye.svg')}
            alt='eye'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('edit') && (
        <IconButton onClick={onEditAction}>
          <Image
            src={require('@/assets/svg/edit.svg')}
            alt='edit'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('add') && (
        <IconButton onClick={onAddAction}>
          <Image
            src={require('@/assets/svg/plusCircle.svg')}
            alt='eye'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('search') && (
        <IconButton onClick={onSearchAction}>
          <Image
            src={require('@/assets/svg/iconSearch.svg')}
            alt='search'
            width={16}
            height={16}
          />
        </IconButton>
      )}

      {actionList.includes('delete') && (
        <IconButton onClick={onDeleteAction}>
          <Image
            src={require('@/assets/svg/delete.svg')}
            alt='delete'
            width={16}
            height={16}
          />
        </IconButton>
      )}
    </div>
  )
}
