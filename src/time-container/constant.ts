import moment from 'moment';
import i18n from '../i18n';

export const real_times = [
  {
    label: i18n('ui.minute'),
    key: 'minute',
    childs: [
      {
        label: i18n('ui.last_5_minutes'),
        key: 'last_5_minutes',
        getValue: () => [moment().valueOf() - 5 * 60 * 1000, moment().valueOf()],
      },
      {
        label: i18n('ui.last_10_minutes'),
        key: 'last_10_minutes',
        getValue: () => [moment().valueOf() - 10 * 60 * 1000, moment().valueOf()],
      },
      {
        label: i18n('ui.last_15_minutes'),
        key: 'last_15_minutes',
        getValue: () => [moment().valueOf() - 15 * 60 * 1000, moment().valueOf()],
      },
    ],
  },
  {
    label: i18n('ui.hour'),
    key: 'hour',
    childs: [
      {
        label: i18n('ui.last_half_an_hour'),
        key: 'last_half_hour',
        getValue: () => [moment().valueOf() - 30 * 60 * 1000, moment().valueOf()],
      },
      {
        label: i18n('ui.last_hour'),
        key: 'last_hour',
        getValue: () => [moment().valueOf() - 60 * 60 * 1000, moment().valueOf()],
      },
      {
        label: i18n('ui.last_6_hours'),
        key: 'last_6_hours',
        getValue: () => [moment().valueOf() - 6 * 60 * 60 * 1000, moment().valueOf()],
      },
    ],
  },
  {
    label: i18n('ui.day'),
    key: 'day',
    childs: [
      {
        label: i18n('ui.half_of_the_day'),
        key: 'half_one_day',
        getValue: () => [moment().valueOf() - 12 * 60 * 60 * 1000, moment().valueOf()],
      },
      {
        label: i18n('ui.today'),
        key: 'today',
        getValue: () => [moment().startOf('day').valueOf(), moment().valueOf()],
      },
      {
        label: i18n('ui.last_three_days'),
        key: 'last_three_days',
        getValue: () => [moment().valueOf() - 3 * 24 * 60 * 60 * 1000, moment().valueOf()],
      },
    ],
  },
  {
    label: i18n('ui.week'),
    key: 'week',
    childs: [
      {
        label: i18n('ui.this_week'),
        key: 'this_week',
        getValue: () => {
          const now = new Date();
          let week = now.getDay() - 1;
          week = week < 0 ? 6 : week;
          return [new Date(now.getFullYear(), now.getMonth(), now.getDate() - week).valueOf(), moment().valueOf()];
        },
      },
      {
        label: i18n('ui.last_two_weeks'),
        key: 'last_two_weeks',
        getValue: () => [moment().valueOf() - 2 * 7 * 24 * 60 * 60 * 1000, moment().valueOf()],
      },
      {
        label: i18n('ui.last_three_weeks'),
        key: 'last_three_weeks',
        getValue: () => [moment().valueOf() - 3 * 7 * 24 * 60 * 60 * 1000, moment().valueOf()],
      },
    ],
  },
  {
    label: i18n('ui.month'),
    key: 'month',
    childs: [
      {
        label: i18n('ui.this_month'),
        key: 'this_month',
        getValue: () => [moment().startOf('month').valueOf(), moment().valueOf()],
      },
      {
        label: i18n('ui.last_two_months'),
        key: 'last_two_months',
        getValue: () => [moment().valueOf() - 2 * 30 * 24 * 60 * 60 * 1000, moment().valueOf()],
      },
      {
        label: i18n('ui.last_three_months'),
        key: 'last_three_months',
        getValue: () => [moment().valueOf() - 3 * 30 * 24 * 60 * 60 * 1000, moment().valueOf()],
      },
    ],
  },
];

export const offlines = [
  {
    label: i18n('ui.day'),
    key: 'day',
    childs: [
      {
        label: i18n('ui.today'),
        key: 'today',
        getValue: () => [moment().startOf('day').valueOf(), moment().valueOf()],
      },
      {
        label: i18n('ui.yesterday'),
        key: 'yesterday',
        getValue: () => [moment().startOf('day').add(-1, 'day').valueOf(), moment().endOf('day').add(-1, 'day').valueOf()],
      },
      {
        label: i18n('ui.last_three_days'),
        key: 'last_three_days',
        getValue: () => [moment().valueOf() - 3 * 24 * 60 * 60 * 1000, moment().valueOf()],
      },
    ],
  },
  {
    label: i18n('ui.week'),
    key: 'week',
    childs: [
      {
        label: i18n('ui.this_week'),
        key: 'this_week',
        getValue: () => [moment().startOf('week').add(1, 'd').valueOf(), moment().valueOf()],
      },
      {
        label: i18n('ui.last_week'),
        key: 'last_week',
        getValue: () => [
          moment()
            .week(moment().week() - 1)
            .startOf('week')
            .valueOf() +
            24 * 60 * 60 * 1000,
          moment()
            .week(moment().week() - 1)
            .endOf('week')
            .valueOf() +
            24 * 60 * 60 * 1000,
        ],
      },
      {
        label: i18n('ui.last_three_weeks'),
        key: 'last_three_weeks',
        getValue: () => [moment().valueOf() - 3 * 7 * 24 * 60 * 60 * 1000, moment().valueOf()],
      },
    ],
  },
  {
    label: i18n('ui.month'),
    key: 'month',
    childs: [
      {
        label: i18n('ui.this_month'),
        key: 'this_month',
        getValue: () => [moment().startOf('month').valueOf(), moment().valueOf()],
      },
      {
        label: i18n('ui.last_month'),
        key: 'last_month',
        getValue: () => [
          moment()
            .month(moment().month() - 1)
            .add(1, 'd')
            .valueOf(),
          moment().valueOf(),
        ],
      },
      {
        label: i18n('ui.last_three_months'),
        key: 'last_three_months',
        getValue: () => [moment().subtract(2, 'month').valueOf(), moment().valueOf()],
      },
    ],
  },
  {
    label: i18n('ui.quarterly'),
    key: 'quarter',
    childs: [
      {
        label: i18n('ui.this_quarter'),
        key: 'this_quarter',
        getValue: () => [moment().startOf('quarter').valueOf(), moment().valueOf()],
      },
      {
        label: i18n('ui.last_quarter'),
        key: 'last_quarter',
        getValue: () => [
          moment()
            .quarter(moment().quarter() - 1)
            .add(1, 'd')
            .valueOf(),
          moment().valueOf(),
        ],
      },
      {
        label: i18n('ui.last_three_quarters'),
        key: 'last_three_quarters',
        getValue: () => [moment().subtract(3, 'quarter').valueOf(), moment().valueOf()],
      },
    ],
  },
  {
    label: i18n('ui.year'),
    key: 'year',
    childs: [
      {
        label: i18n('ui.this_year'),
        key: 'this_year',
        getValue: () => [moment().startOf('year').valueOf(), moment().valueOf()],
      },
      {
        label: i18n('ui.last_year'),
        key: 'last_year',
        getValue: () => [
          moment()
            .year(moment().year() - 1)
            .add(1, 'd')
            .valueOf(),
          moment().valueOf(),
        ],
      },
      {
        label: i18n('ui.last_three_years'),
        key: 'last_three_years',
        getValue: () => [moment().subtract(3, 'year').valueOf(), moment().valueOf()],
      },
    ],
  },
];

export const enable_loop_keys = ['last_5_minutes', 'last_10_minutes', 'last_15_minutes', 'last_half_hour', 'last_hour', 'last_6_hours'];

export const loop_list = [
  {
    label: 'off',
    value: 0,
  },
  {
    label: '15s',
    value: 15000,
  },
  {
    label: '30s',
    value: 30000,
  },
  {
    label: '1m',
    value: 60000,
  },
];

export const loop_off = [
  {
    label: 'off',
    value: 0,
  },
];
