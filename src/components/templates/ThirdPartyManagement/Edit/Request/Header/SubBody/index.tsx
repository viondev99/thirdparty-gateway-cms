import React, { useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import {
  Checkbox, Collapse, IconButton, TextField,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import { TextFieldCustom } from '@/components/atoms/TextFieldCustom'
import {
  isMaxLength,
  isNumeric,
  isRequired,
  paramRegexp,
} from '@/components/templates/ThirdPartyManagement/Create/validate'
import Image from 'next/image'
import { newParamRequest } from '@/constants/apiFeature'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

type Prods = {
  child: any,
  shareSubRequest: any,
  submit: boolean,
  dataTypes: any,
  listMappingParams: any
}

export const AddSubBody = (prods: Prods) => {
  const { t } = useTranslation('apiFeatureManagement/index')

  const [childs, setChilds] = React.useState(prods.child.childs)

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)

  const [paramValue, setParamValue] = React.useState<string>(prods.child.name)
  const [featureAPIPropertiesId, setMappingCode] = React.useState<any>(prods.child.featureAPIPropertiesId)
  const [defaultValue, setDefaultValue] = React.useState<string>(prods.child.defaultValue)
  const [dataTypeId, setDataTypeId] = React.useState<number>(prods.child.dataTypeId)
  const [format, setFormat] = React.useState<number>(prods.child.format)
  const [description, setDescription] = React.useState<any>(prods.child.description)

  prods.child.error = (isRequired('Feature', paramValue).error || paramRegexp('Feature', paramValue).error)

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  prods.child.error = (isRequired('Feature', paramValue).error || paramRegexp('Feature', paramValue).error)

  const shareSubRequest = (action: string, subParam: any) => {
    if (action === 'REMOVE') {
      const newSubParams = childs.filter(function(el: any) { return el.index != subParam.index; });
      // const newSubParams = childs.map(obj => {
      //   if (obj.index === subParam.index) {
      //     return {...obj, isDeleted: true};
      //   }
      //   return obj;
      // });
      setChilds(newSubParams)
      prods.child.childs = newSubParams;
    }
  }

  const changeParams = (event: any) => {
    setCheckParamValue(true);
    setParamValue(event.target.value.trim());
    prods.child.name = event.target.value;
  }

  const changeMappingParams = (value: any) => {
    setMappingCode(value);
    prods.child.featureAPIPropertiesId = value;

  };

  const changeDataType = (value: any) => {
    setDataTypeId(value);
    prods.child.childs = [];
    setChilds(prods.child.childs)
    prods.child.dataTypeId = value;
  };

  const changeDefaultValue = (value: any) => {
    setDefaultValue(value.trim());
    prods.child.defaultValue = value;
  };

  const changeFormat = (value: any) => {
    setFormat(value.trim());
    prods.child.format = value;
  };

  const changeDescription = (value: string) => {
    setDescription(value.trim());
    prods.child.description = value;
  }

  const removeSubRequest = () => {
    prods.shareSubRequest('REMOVE', prods.child)
  }

  const dataTypeIsArrayOrObject = (dataTypeId: number) => {
    const dataType = prods.dataTypes.find((dataType: any) => dataType.value === dataTypeId);
    return dataType?.isParent;
  }

  const canAddSubRequest = () => {
    return prods.child.index && dataTypeIsArrayOrObject(prods.child.dataTypeId);
  }

  const addNewSubRequest = () => {
    const newSubParamIndex = (childs.length > 0) ? (childs[childs.length - 1].index + 1) : 1;
    const newSubParams = [...childs, newParamRequest(newSubParamIndex)]
    prods.child.childs = newSubParams;
    setChilds(newSubParams)
  }

  if (prods.child.isDeleted) {
    return ''
  }
  
  return (
    <List>
      <Grid container spacing={2} style={{display: 'flex', alignItems: 'center'}}>
        <Grid item xs={12} sm={12} md={6} lg={1}>
          {/*{*/}
          {/*  childs && childs.length > 0 ? (*/}
          {/*    <>*/}
          {/*      {open ? <ExpandLess onClick={handleClick} style={{cursor: 'pointer'}} /> : <ExpandMore style={{cursor: 'pointer'}} onClick={handleClick} />}*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*    </>*/}
          {/*  )*/}
          {/*}*/}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <TextField
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            name='name'
            value={paramValue}
            placeholder='Enter Param'
            onBlur={() => setCheckParamValue(true)}
            error={(prods.submit || checkParamValue) && (isRequired('Param', paramValue).error || paramRegexp('Param', paramValue).error)}
            helperText={(prods.submit || checkParamValue) && (isRequired('Param', paramValue).message || paramRegexp('Param', paramValue).message)}
            required
            onChange={(event) => {changeParams(event)}}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.8} style={{textAlign: 'center'}}>
          <SelectBoxCustom
            value={featureAPIPropertiesId}
            placeholder='Enter Mapping Params'
            options={prods.listMappingParams}
            onChange={(event) => changeMappingParams(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <SelectBoxCustom
            value={dataTypeId}
            placeholder='Enter Data Type'
            options={prods.dataTypes}
            onChange={(event) => changeDataType(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <TextField
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            value={defaultValue}
            placeholder='Enter Default Value'
            onChange={(event) => changeDefaultValue(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <TextField
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            value={format}
            placeholder='Enter Format'
            onChange={(event) => changeFormat(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <TextField
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            placeholder='Enter Description'
            value={description}
            onBlur={() => setCheckDescription(true)}
            error={(prods.submit || checkDescription) && isMaxLength('Description', description, 255).error}
            helperText={(prods.submit || checkDescription) && isMaxLength('Description', description, 255).message}
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
          <IconButton onClick={() => removeSubRequest()}>
            <Image
              src={require('@/assets/svg/delete.svg')}
              alt='delete'
              width={20}
              height={20}
            />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
          {/*{*/}
          {/*  canAddSubRequest() ? (*/}
          {/*    <IconButton onClick={ () => addNewSubRequest()}>*/}
          {/*      <Image*/}
          {/*        src={require('@/assets/svg/plusCircle.svg')}*/}
          {/*        alt='delete'*/}
          {/*        width={20}*/}
          {/*        height={20}*/}
          {/*      />*/}
          {/*    </IconButton>*/}
          {/*  ): ''*/}
          {/*}*/}
        </Grid>
      </Grid>
      {/*<div>*/}
      {/*  <Collapse in={open} timeout="auto" unmountOnExit>*/}
      {/*    <List component="div" disablePadding>*/}
      {/*      {(childs ?? []).map((child: any, i: number) => <AddSubRequest submit={prods.submit} child={child} dataTypes={prods.dataTypes} shareSubRequest={shareSubRequest} key={i} />)}*/}
      {/*    </List>*/}
      {/*  </Collapse>*/}
      {/*</div>*/}
    </List>
  )
}
