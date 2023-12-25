export const API_URL = {
  GET_LIST_ASSIGN_FEATURE: '/v1/assign-feature',
  GET_LIST_API_FEATURE: '/v1/feature',
  GET_LIST_INTERNAL_SYSTEM: '/v1/internal-system',
  CREATE_FEATURE: '/v1/assign-feature',
  UPDATE_FEATURE: '/v1/assign-feature',
  DELETE_FEATURE: '/v1/assign-feature',

  GET_LIST_API_FEATURE_MANAGEMENT: '/v1/feature/search',

  GET_PARTNER_TYPE: '/v1/system/role-types',
  GET_PARTNER_SERVICE: '/v1/system/services',
  GET_PARTNER: '/v1/partner/info',
  GET_LIST_METHOD: '/v1/feature',
  GET_LIST_PROTOCOL: '/v1/internal-system',
  GET_FORMAT_LIST: '/v1/format-management/all',
  GET_PARTNER_INFO: '/v1/partner/info',

  REPORT: {
    REPORT_COMPARE: '/v1/report/compare',
    REPORT_COMPARE_EXPORT: '/v1/report/compare/export',
    REPORT_SUMMARY: '/v1/report/summary',
    REPORT_SUMMARY_EXPORT: '/v1/report/summary/export',
  },

  DECODE: {
    SEARCH: '/v1/decode-management/search',
    DETAIL: `/v1/decode-management`,
    CREATE: '/v1/decode-management/create',
    EDIT: `/v1/decode-management/update`,
    DELETE: `/v1/decode-management/delete`,
    PUBLISH: `v1/decode-management/publish`,
  },
  FORMAT: {
    SEARCH: '/v1/format-management/search',
    DETAIL: '/v1/format-management/:id',
    CREATE: '/v1/format-management/create',
    UPDATE: '/v1/format-management/update',
    DELETE: '/v1/format-management/delete/:id',
    SEARCH_ALL_ACTIVE: '/v1/format-management/all',
    PUBLISH: `v1/format-management/publish`,
  },

  OUTBOUND: {
    DETAIL_OUTBOUND_THIRD_PARTY_CONFIG: '/v1/outbound-config/detail',
    CREATE_OUTBOUND_THIRD_PARTY_CONFIG: '/v1/outbound-config/create',
    EDIT_OUTBOUND_THIRD_PARTY_CONFIG: '/v1/outbound-config/update',
    SEARCH: '/v1/outbound-config/search',
    SEARCH_FOR_ADD_3RD_API: "/v1/outbound-config/find-by-third-party"
  },

  API_FEATURE: {
    LIST: '/v1/feature/search',
    CREATE: '/v1/feature/create',
    GET_DATA_INIT: '/v1/common/init',
    GET_DETAIL_API_FEATURE_MANAGEMENT: `/v1/feature/find-by-id`,
    PUBLISH: `/v1/feature/publish`,
    DELETE: `/v1/feature`,
    UPDATE: `/v1/feature/update`,
    PROPERTIES: `/v1/feature/find-by-id`
  },

  THIRDPARTY: {
    GET_LIST_THIRD_PARTY_MANAGEMENT: '/v1/third-party-api/search',
    CREATE_THIRD_PARTY_MANAGEMENT: '/v1/third-party-api/create',
    EDIT_THIRD_PARTY_MANAGEMENT: '/v1/third-party-api/update',
    DETAIL: '/v1/third-party-api/find-by-id',
    DELETE: '/v1/third-party-api',
    PUBLISH: '/v1/third-party-api/publish',

    GET_LIST_TYPE_THIRD_PARTY: '/v1/type-third-party',
    GET_LIST_THIRD_PARTY: 'v1/third-party',
    GET_LIST_THIRD_PARTY_API: 'v1/feature',
  },

  ACTION_LOG_PROCESS: {
    SEARCH: '/v1/action-log-process-api/search',
    DETAIL: '/v1/action-log-process-api/detail'

  },

  ACTION_LOG_HISTORY: {
    SEARCH: '/v1/action-log-api/search',
    DETAIL: '/v1/action-log-api/detail'
  }
}
