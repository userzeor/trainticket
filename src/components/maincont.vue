<template>
  <div class="main_box">
    <div class="table_header">
      <el-row>
        <div class="grid-content">
          出发地：
          <el-autocomplete
            placeholder="请输入出发地"
            prefix-icon="el-icon-location"
            v-model="departureStation"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="grid-content">
          目的地：
          <el-autocomplete
            placeholder="请输入目的地"
            prefix-icon="el-icon-location"
            v-model="destinationStation"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </el-row>
      <el-row>
        <div class="grid-content">
          出发日：
          <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="请选择出发日"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div class="grid-content">
          返程日：
          <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="请选择返程日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div class="grid-content">
          <el-button type="primary" round class="query_btn" @click="queryList">查询</el-button>
        </div>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          123
        </template>
      </el-table-column>
      <el-table-column
        prop="trainNum"
        label="车次"
        width="100"
        align="center">
        <template slot-scope="scope">
          <div class="trainNum">
            {{scope.row.trainNum}}
          </div>
          <el-popover
            placement="right"
            width="450"
            trigger="click"
            @hide="hidePop">
            <div v-loading="isDisplay"
                 element-loading-text="加载数据中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(255, 255, 255, 0.8)">
              <el-table
                :data="popGridData"
                max-height="480">
                <el-table-column width="90" property="station_no" label="站序"></el-table-column>
                <el-table-column width="90" property="station_name" label="站名"></el-table-column>
                <el-table-column width="90" property="arrive_time" label="到站时间"></el-table-column>
                <el-table-column width="90" property="start_time" label="出发时间"></el-table-column>
                <el-table-column width="90" property="stopover_time" label="停留时间"></el-table-column>
              </el-table>
              <el-row>
                <el-col :span="4">
                  <div class="train_info">{{popGridData[0] ? popGridData[0].station_train_code + '次' : ''}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="train_info">{{popGridData[0] ? popGridData[0].start_station_name +'  --->  '+ popGridData[0].end_station_name : ''}}</div>
                </el-col>
                <el-col :span="4">
                  <div class="train_info">{{popGridData[0] ? popGridData[0].train_class_name : ''}}</div>
                </el-col>
                <el-col :span="4">
                  <div class="train_info">{{popGridData[0] ? (popGridData[0].service_type == '2' ? '有空调' : '') : ''}}</div>
                </el-col>
              </el-row>
            </div>
            <el-button slot="reference" type="primary" round size="mini"
                       @click="seeTrainInfo(scope.row)">查看详情</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="departureStation"
        label="出发站"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="destinationStation"
        label="到达站"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sTime"
        label="出发时间"
        sortable
        width="105"
        :formatter="formatterValue"
        :default-sort = "{prop: 'date', order: 'descending'}"
        align="center">
      </el-table-column>
      <el-table-column
        prop="eTime"
        label="到达时间"
        sortable
        width="105"
        :formatter="formatterValue"
        :default-sort = "{prop: 'date', order: 'descending'}"
        align="center">
      </el-table-column>
      <el-table-column
        prop="tTime"
        label="历时"
        sortable
        width="80"
        :default-sort = "{prop: 'date', order: 'descending'}"
        align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            {{ scope.row.trainState === '预订' ? scope.row.tTime : '--' }}
          </div>
          <div class="name-wrapper" v-if="scope.row.trainState === '预订'">
            <el-tag size="medium">{{ customArrivalTime(scope.row) }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="specialSeat"
        label="商务座 特等座"
        width="65"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="firstSeat"
        label="一等座"
        width="65"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="secondSeat"
        label="二等座"
        width="65"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="seniorSoftBerth"
        label="高级软卧"
        width="85"
        :formatter="formatterValue"
        align="center">
      </el-table-column><el-table-column
        prop="softBerth"
        label="软卧"
        width="50"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="moveBerth"
        label="动卧"
        width="50"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="hardSeats"
        label="硬卧"
        width="50"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="softSeats"
        label="软座"
        width="50"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="hardBerth"
        label="硬座"
        width="50"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="noSeat"
        label="无座"
        width="50"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="other"
        label="其他"
        width="50"
        :formatter="formatterValue"
        align="center">
      </el-table-column>
      <el-table-column
        prop="trainState"
        label="备注"
        max-width="50"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import utils from '../utils/utils'
export default {
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          var startday = new Date()
          startday.setDate(startday.getDate() - 1)
          var endday = new Date()
          endday.setDate(endday.getDate() + 29)
          if ((time.getTime() < startday) || (time.getTime() > endday)) {
            return true
          } else {
            return false
          }
        }
      },
      departureStation: '',
      destinationStation: '',
      startDate: '',
      endDate: '',
      tableData: [],
      stationList: [],
      popGridData: [],
      isDisplay: true
    }
  },
  methods: {
    querySearch: function (queryString, cb) {
      var restaurants = this.stationList
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect (item) {
      // console.log(item)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString) === 0 || restaurant.text.indexOf(queryString.toUpperCase()) === 0)
      }
    },
    customArrivalTime: function (row) {
      if (row.trainState !== '预订') {
        return '--'
      }
      var stimeDate = row.date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
      var comstime = stimeDate + ' ' + row.sTime
      var today = utils.formatStretchTime(comstime, row.tTime)
      var etest = new Date(stimeDate + ' ' + '23:59:59')
      var addoneday = etest.setDate(etest.getDate())
      var addtwoday = etest.setDate(etest.getDate() + 1)
      var addthreeday = etest.setDate(etest.getDate() + 2)
      var addfourday = etest.setDate(etest.getDate() + 3)
      if (today < addoneday) {
        return '当日达'
      } else if (today > addoneday && today < addtwoday) {
        return '次日达'
      } else if (today > addtwoday && today < addthreeday) {
        return '两日达'
      } else if (today > addthreeday && today < addfourday) {
        return '三日达'
      }
    },
    formatterValue: function (row, column, cellValue) {
      if (row.trainState === '预订') {
        if (cellValue) {
          return cellValue
        } else {
          return '--'
        }
      } else {
        return '--'
      }
    },
    queryList: function () {
      var self = this
      var reqdata = {
        'departureStation': this.departureStation,
        'destinationStation': this.destinationStation,
        'startDate': this.startDate,
        'endDate': this.endDate
      }
      utils.trainPostJson('train/getTrainList', reqdata, function (data) {
        var resDataList = data.data.trainList
        self.tableData = resDataList
      }, function (errormasg) {

      })
    },
    loadStationData: function () {
      var self = this
      utils.trainGetJson('train/getStationList', {}, function (data) {
        self.stationList = data.data.stationList
      }, function (errormasg) {

      })
    },
    seeTrainInfo: function (row) {
      var self = this
      var reqdata = {
        'trainId': row.trainId,
        'startStation': row.startStation,
        'endStation': row.endStation,
        'date': row.date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
      }
      utils.trainPostJson('train/getTrainInfo', reqdata, function (data) {
        self.popGridData = data.data.trainInfoList.data
        self.isDisplay = false
      }, function (errormasg) {

      })
    },
    hidePop: function () {
      this.isDisplay = true
      this.popGridData = []
    }
  },
  mounted: function () {
    this.loadStationData()
  }
}
</script>

<style>
  .main_box {
    margin: 0 20px;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
  }
  .table_header .el-row{
    margin-bottom: 15px;
  }
  .gutter{
    display: initial !important;
  }
  .grid-content{
    display: inline-block;
    margin-right: 15px;
  }
  .grid-content .el-input{
    display: inline-block;
    width: 220px;
  }
  .query_btn{
    width: 150px;
  }
  .trainNum{
    padding: 7px;
    font-size: 20px;
  }
  .train_info{
    padding: 11px 0;
    text-align: center;
  }
</style>
