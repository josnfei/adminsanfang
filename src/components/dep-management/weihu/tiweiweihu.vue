<template>
	<div class="tiweiweihu">
		<div class="title">
			<BreadcrumbItem>新增</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="edit">
			<div class="title">
				<span>位置： </span>
				<Breadcrumb separator=">">
					<BreadcrumbItem to="/home/depManagement/tiwei">部门管理</BreadcrumbItem>
					<BreadcrumbItem>
						<a href="javascript:;" @click='cancel'>堤围数据</a>
					</BreadcrumbItem>
					<!--<BreadcrumbItem>{{moduleTitle}}</BreadcrumbItem>-->
				</Breadcrumb>
			</div>
			<div class="editHead">
				<span>基本信息</span>
			</div>
			<div class="editcontant">
				<!--<Form ref="formItem" :rules="ruleValidate" :model="formItem" :label-width="0">-->
				<Form ref="formItem" :model="formItem" :label-width="0">
					<table class="ed-table">
						<tbody>
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">基本情况</td>
							</tr>
							<tr>
								<td class="ed-label">堤围名称</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="dike_name" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.dike_name"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">填表人</td>
								<td class="ed-content">
									<FormItem label="" prop="fillbby" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.fillbby"></Input>
									</FormItem>
								</td>

								<td class="ed-label">填表时间</td>
								<td class="ed-content">
									<FormItem label="" prop="createdt" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.createdt"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>

								<td class="ed-label">所在镇(街)</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="town" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.town"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">审核人</td>
								<td class="ed-content">
									<FormItem label="" prop="checkby" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.checkby"></Input>
									</FormItem>
								</td>
								<td class="ed-label">复核人</td>
								<td class="ed-content">
									<FormItem label="" prop="doublecheckby" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.doublecheckby"></Input>
									</FormItem>
								</td>
								<td class="ed-label">长度</td>
								<td class="ed-content">
									<FormItem label="" prop="length" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.length"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">终点断面位置</td>
								<td class="ed-content">
									<FormItem label="" prop="markplace" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.markplace"></Input>
									</FormItem>
								</td>

								<td class="ed-label">保护耕地(万亩)</td>
								<td class="ed-content">
									<FormItem label="" prop="protection_area" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.protection_area"></Input>
									</FormItem>
								</td>
								<td class="ed-label">other_building</td>
								<td class="ed-content">
									<FormItem label="" prop="other_building" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.other_building"></Input>
									</FormItem>
								</td>
							</tr>

							<tr>
								<td class="ed-label">典型断面位置</td>
								<td class="ed-content">
									<FormItem label="" prop="section_place" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.section_place"></Input>
									</FormItem>
								</td>
								<td class="ed-label">section_designlevel</td>
								<td class="ed-content">
									<FormItem label="" prop="section_designlevel" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.section_designlevel"></Input>
									</FormItem>
								</td>
								<td class="ed-label">主管部门 </td>
								<td class="ed-content">
									<FormItem label="" prop="governor" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.governor"></Input>
									</FormItem>
								</td>

							</tr>

							<tr>
								<td class="ed-label">历史最高洪水位(m)</td>
								<td class="ed-content">
									<FormItem label="" prop="history_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.history_level"></Input>
									</FormItem>
								</td>
								<td class="ed-label">受影响人员数(万人)</td>
								<td class="ed-content">
									<FormItem label="" prop="affected_population" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.affected_population"></Input>
									</FormItem>
								</td>
								<td class="ed-label">管理单位</td>
								<td class="ed-content">
									<FormItem label="" prop="manager" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.manager"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">受影响人员数(万人)</td>
								<td class="ed-content">
									<FormItem label="" prop="ongoing_project" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.ongoing_project"></Input>
									</FormItem>
								</td>
								<td class="ed-label">工程级别</td>
								<td class="ed-content">
									<FormItem label="" prop="project_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.project_level"></Input>
									</FormItem>
								</td>
								<td class="ed-label">建设时间(年)</td>
								<td class="ed-content">
									<FormItem label="" prop="build_date" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.build_date"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">所在河道</td>
								<td class="ed-content">
									<FormItem label="" prop="river" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.river"></Input>
									</FormItem>
								</td>
								<td class="ed-label">bridge</td>
								<td class="ed-content">
									<FormItem label="" prop="bridge" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.bridge"></Input>
									</FormItem>
								</td>
								<td class="ed-label">pumpstation</td>
								<td class="ed-content">
									<FormItem label="" prop="pumpstation" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.pumpstation"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">sluice</td>
								<td class="ed-content">
									<FormItem label="" prop="sluice" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.sluice"></Input>
									</FormItem>
								</td>
								<td class="ed-label">dock</td>
								<td class="ed-content">
									<FormItem label="" prop="dock" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.dock"></Input>
									</FormItem>
								</td>
								<td class="ed-label">pipeline</td>
								<td class="ed-content">
									<FormItem label="" prop="pipeline" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.pipeline"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">终点断面位置</td>
								<td class="ed-content">
									<FormItem label="" prop="endpoint_section" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.endpoint_section"></Input>
									</FormItem>
								</td>

								<td class="ed-label">终点断面桩号</td>
								<td class="ed-content">
									<FormItem label="" prop="endpoint_mileage" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.endpoint_mileage"></Input>
									</FormItem>
								</td>
								<td class="ed-label">warning_level</td>
								<td class="ed-content">
									<FormItem label="" prop="warning_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warning_level"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">设计标准(重现期)</td>
								<td class="ed-content">
									<FormItem label="" prop="design_standard" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.design_standard"></Input>
									</FormItem>
								</td>
								<td class="ed-label">起点断面位置</td>
								<td class="ed-content">
									<FormItem label="" prop="startpoint_section" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.startpoint_section"></Input>
									</FormItem>
								</td>
								<td class="ed-label">起点断面桩号</td>
								<td class="ed-content">
									<FormItem label="" prop="startpoint_mileage" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.startpoint_mileage"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">protection_object</td>
								<td class="ed-content">
									<FormItem label="" prop="protection_object" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.protection_object"></Input>
									</FormItem>
								</td>
								<td class="ed-label">risk_segment</td>
								<td class="ed-content">
									<FormItem label="" prop="risk_segment" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.risk_segment"></Input>
									</FormItem>
								</td>
							</tr>

							<tr>
								<td class="ed-label">信息化设备</td>
								<td class="ed-content">
									<FormItem label="" style="margin: 0" prop="information_equipment">
										<RadioGroup v-model="formItem.information_equipment">
											<Radio label="有">有</Radio>
											<Radio label="无">无</Radio>
										</RadioGroup>
									</FormItem>
								</td>
								<td class="ed-label">所在位置</td>
								<td class="ed-content" colspan="3">
									<FormItem label="" prop="location" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.location"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">管理单位</td>
								<td class="ed-content" colspan="2">
									<FormItem label="" prop="manager" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.manager"></Input>
									</FormItem>
								</td>

							</tr>
							<tr>
								<td class="ed-label">起止桩号</td>
								<td class="ed-content" colspan="2">
									<FormItem label="" prop="start_stakeno" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.start_stakeno"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">防汛责任制</td>
							</tr>
							<tr>
								<td class="ed-label">防汛行政责任人</td>
								<td class="ed-content">
									<FormItem label="" prop="administrator.name" style="margin: 0">
										<Input placeholder="请输入姓名" style="width:80%" v-model="formItem.administrator.name"></Input>
									</FormItem>
								</td>
								<!--&nbsp;&nbsp;-->
								<td class="ed-label">防汛行政责任人单位</td>
								<td class="ed-content">
									<FormItem label="" prop="administrator.department" style="margin: 0">
										<Input placeholder="请输入单位" style="width:80%" v-model="formItem.administrator.department"></Input>
									</FormItem>
								</td>
								<td class="ed-label">防汛行政责任人职务</td>
								<td class="ed-content">
									<FormItem label="" prop="administrator.duty" style="margin: 0">
										<Input placeholder="请输入职务" style="width:80%" v-model="formItem.administrator.duty"></Input>
									</FormItem>
								</td>

							</tr>
							<tr>
								<td class="ed-label">防汛行政责任人电话</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="administrator.telephone" style="margin: 0">
										<Input placeholder="请输入电话" style="width:80%" v-model="formItem.administrator.telephone"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">防汛技术责任人</td>
								<td class="ed-content">
									<FormItem label="" prop="technical_director.name" style="margin: 0">
										<Input placeholder="请输入姓名" style="width:80%" v-model="formItem.technical_director.name"></Input>
									</FormItem>
								</td>
								<!--&nbsp;&nbsp;-->
								<td class="ed-label">防汛技术责任人单位</td>
								<td class="ed-content">
									<FormItem label="" prop="technical_director.department" style="margin: 0">
										<Input placeholder="请输入单位" style="width:80%" v-model="formItem.technical_director.department"></Input>
									</FormItem>
								</td>
								<td class="ed-label">防汛技术责任人职务</td>
								<td class="ed-content">
									<FormItem label="" prop="technical_director.duty" style="margin: 0">
										<Input placeholder="请输入职务" style="width:80%" v-model="formItem.technical_director.duty"></Input>
									</FormItem>
								</td>

							</tr>
							<tr>
								<td class="ed-label">防汛技术责任人电话</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="technical_director.telephone" style="margin: 0">
										<Input placeholder="请输入电话" style="width:80%" v-model="formItem.technical_director.telephone"></Input>
									</FormItem>
								</td>
							</tr>
							<!--管理员-->
							<tr>
								<td class="ed-label">管理单位负责人</td>
								<td class="ed-content">
									<FormItem label="" prop="operator.name" style="margin: 0">
										<Input placeholder="请输入姓名" style="width:80%" v-model="formItem.operator.name"></Input>
									</FormItem>
								</td>
								<!--&nbsp;&nbsp;-->
								<td class="ed-label">管理单位负责人单位</td>
								<td class="ed-content">
									<FormItem label="" prop="operator.department" style="margin: 0">
										<Input placeholder="请输入单位" style="width:80%" v-model="formItem.operator.department"></Input>
									</FormItem>
								</td>
								<td class="ed-label">管理单位负责人职务</td>
								<td class="ed-content">
									<FormItem label="" prop="operator.duty" style="margin: 0">
										<Input placeholder="请输入职务" style="width:80%" v-model="formItem.operator.duty"></Input>
									</FormItem>
								</td>

							</tr>
							<tr>
								<td class="ed-label">管理单位负责人电话</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="operator.telephone" style="margin: 0">
										<Input placeholder="请输入电话" style="width:80%" v-model="formItem.operator.telephone"></Input>
									</FormItem>
								</td>
							</tr>
							<!--应急预警-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">应急预警</td>
							</tr> 
							<tr>
								<td class="ed-label">防洪预案是否编辑</td>
								<td class="ed-content">
									<FormItem label="" prop="have_prevention_plan" style="margin: 0">
										<RadioGroup v-model="formItem.have_prevention_plan">
											<Radio label="是都">是</Radio>
											<Radio label="否">否</Radio>
										</RadioGroup>
									</FormItem>
								</td>
								<td class="ed-label">群众转移方案是否编辑</td>
								<td class="ed-content">
									<FormItem label="" prop="have_tranfer_plan" style="margin: 0">
										<RadioGroup v-model="formItem.have_tranfer_plan">
											<Radio label="是的">是</Radio>
											<Radio label="否">否</Radio>
										</RadioGroup>
									</FormItem>
								</td>
							</tr>
							<!---->
							<tr>
								<td class="ed-label">其他相关预案(名称)</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="other_plan" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.other_plan"></Input>
									</FormItem>
								</td>
							</tr>
							<!--应急抢救-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">应急抢救</td>
							</tr>
							<tr>
								<td class="ed-label">抢险队伍人数（人）</td>
								<td class="ed-content">
									<FormItem label="" prop="emergency_team.headcount" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.emergency_team.headcount"></Input>
									</FormItem>
								</td>
								<td class="ed-label">负责人姓名</td>
								<td class="ed-content">
									<FormItem label="" prop="emergency_team.director" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.emergency_team.director"></Input>
									</FormItem>
								</td>
								<td class="ed-label">负责人电话</td>
								<td class="ed-content">
									<FormItem label="" prop="emergency_team.director_telephone" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.emergency_team.director_telephone"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">联系人姓名</td>
								<td class="ed-content">
									<FormItem label="" prop="emergency_team.contacts" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.emergency_team.contacts"></Input>
									</FormItem>
								</td>
								<td class="ed-label">联系人电话</td>
								<td class="ed-content">
									<FormItem label="" prop="emergency_team.contact_number" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.emergency_team.contact_number"></Input>
									</FormItem>
								</td>
							</tr>
							<!--防汛抢险物资储备现状情况-->
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">防汛抢险物资储备现状情况</td>
							</tr>
							<tr>
								<td class="ed-label">袋类（条）</td>
								<td class="ed-content">
									<FormItem label="" prop="warehouse_statistics.bag" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.bag"></Input>
									</FormItem>
								</td>
								<td class="ed-label">土工布（m²）</td>
								<td class="ed-content">
									<FormItem label="" prop="warehouse_statistics.pump" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.pump"></Input>
									</FormItem>
								</td>
								<td class="ed-label">砂石(m³)</td>
								<td class="ed-content">
									<FormItem label="" prop="warehouse_statistics.tube" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.tube"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">块石（m³）</td>
								<td class="ed-content">
									<FormItem label="" prop="warehouse_statistics.searchlight" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.searchlight"></Input>
									</FormItem>
								</td>
								<td class="ed-label">救生衣(件)</td>
								<td class="ed-content">
									<FormItem label="" prop="warehouse_statistics.power_supply" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.power_supply"></Input>
									</FormItem>
								</td>
								<td class="ed-label">存放点与水库(山塘)距离（m）</td>
								<td class="ed-content">
									<FormItem label="" prop="warehouse_statistics.distance" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.distance"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">安全鉴定</td>
							</tr>
							<tr>
								<td class="ed-label">是否进行过安全鉴定</td>
								<td class="ed-content">
									<FormItem label="" prop="safety_evaluation.be_checked" style="margin: 0">
										<RadioGroup v-model="formItem.safety_evaluation.be_checked">
											<Radio label="有d">有</Radio>
											<Radio label="否">否</Radio>
										</RadioGroup>
									</FormItem>
								</td>
								<td class="ed-label">时间</td>
								<td class="ed-content">
									<FormItem label="" prop="safety_evaluation.check_date" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.safety_evaluation.check_date"></Input>
									</FormItem>
								</td>
								<td class="ed-label">安全类别</td>
								<td class="ed-content">
									<FormItem label="" prop="safety_evaluation.safety_type" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.safety_evaluation.safety_type"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">主要结论</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="safety_evaluation.result" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.safety_evaluation.result"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">地图经纬度</td>
							</tr>
							<tr>
								<td class="ed-label">经度</td>
								<td class="ed-content">
									<FormItem label="" prop="lng" style="margin: 0">
										<Input placeholder="经度" style="width:80%" v-model="formItem.lng"></Input>
									</FormItem>
								</td>
								<td class="ed-label">纬度</td>
								<td class="ed-content">
									<FormItem label="" prop="lat" style="margin: 0">
										<Input placeholder="纬度" style="width:80%" v-model="formItem.lat"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-content" colspan="20" style="width: 100px; text-align: center; background-color: #40B0FF;color: #FFF5E6;">涉及到社区</td>
							</tr>
							<Button class="addbtn" @click="addbtns">
								<Icon type="plus-round" ></Icon>
								添加
							</Button>
							<tr>
								<th v-for="item in athead">{{item.name}}</th>
							</tr>
							<tr v-for="item in tdthead">
								<td contenteditable=true></td>
								<td contenteditable=true></td>
								<td></td>
								<td></td>
							</tr>

						</tbody>

					</table>
					<!--地图-->
					<i-col span="24">
						<div id="myMap1">
							<div class="amap-page-container">
								<el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
								</el-amap>

								<!--<div class="toolbar">
									<button @click="getMap()">get map</button>
								</div>-->
							</div>
						</div>
					</i-col>
				</Form>
			</div>
			<div class="editFooter">
				<Button type="ghost" @click='cancel' style="margin-right: 10px">关闭</Button>
				<!--<Button type="primary" @click="_sureBtn">保存</Button>-->
				<Button type="primary" @click="_sureBtn" v-if="btns">保存</Button>
				<Button type="warning" @click="_gettiaoeditList" v-if="btn">修改保存</Button>
			</div>
		</div>
	</div>
</template>

<script>
	//	import { preTaskThead } from 'common/js/table'
	import { initTime } from 'common/js/util'
	import { depTaskQuery } from 'common/js/query'
	//	import { presetTask } from 'common/js/rules'
	//	import { mapGetters, mapMutations } from 'vuex';
	import { getUserList, getaddlist, geteditlist, getdellist } from 'api/tiwei';
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage, senActive } from 'common/js/dom'
	import vueAMap from 'vue-amap';
	let amapManager = new vueAMap.AMapManager();
	export default {
		//		computed: {
		//			...mapGetters([
		//				'SHUIKU'
		//			])
		//		},
		data() {
			return {
				amapManager,
				zoom: 12,
				center: [113.17213016912342, 23.02122420436683],
				events: {
					init: (o) => {
						//						console.log(o.getCenter())
						//						console.log(this.$refs.map.$$getInstance())
						o.getCity(result => {
							//							console.log(result)
						})
					},
					'moveend': () => {},
					'zoomchange': () => {},
					'click': (e) => {
						this.formItem.lat = e.lnglat.O;
						this.formItem.lng = e.lnglat.P;
					}

				},
				plugin: ['ToolBar', {
					pName: 'MapType',
					defaultType: 0,
					events: {
						init(o) {
							console.log(o);
						}
					}
				}],
				athead: [{
					name: '社区'
				}, {
					name: '需要转移人数'
				}, {
					name: '已转移人数'
				}, {
					name: '时间'
				}],
				tdthead: new Array(1),
				btns: true,
				btn: false,
				endType: '天',
				responseResult: [],
				autoCompleteData: [],
				departmentList: [],
				selectLoading: false,
				num: 1,
				detObj: {},
				sure_del: false,
				delObj: {},
				formDisabled: false,
				detDisabled: true,
				formItem: {
					lng: 0,
					lat: 0,
					safety_evaluation: {},
					administrator: {},
					technical_director: {},
					emergency_team: {},
					warehouse_statistics: {},
					operator: {}
				},
				disabled: false,
				tableTbody: [],
				total: 0,
				searchVal: {
					department_name: '',
					task_type: '',
				},
			}
		},
		mounted() {
			this._getuserlist();
		},
		created() {
			this.id = getLocalStorage("id");
			this.formItemd = getLocalStorage('formItemd');
		},
		methods: {
			//点击新增就多一行tr
			addbtns() {
				this.tdthead.length++;
				this.tdthead.push();
			},
			// 选择预案类型
			planTypeSelect(value) {
				// this.getRespontResult()
				var arr = []
				this.responseResult.map(item => {
					if(item.plan_type === '全部' || item.play_type === value) {
						arr.push(item)
					}
				})
				this.responseResult = arr
			},

			cancel() {
				this.$router.push('/home/depManagement/tiwei')
			},
			//表格显示
			_getuserlist(search) {
				search = {
					id: this.id
				}
				if(getLocalStorage('id') != 'false') {
					getUserList(search).then(res => {
						if(res.code === ERR_OK) {
							this.formItem = this.formItemd;
							this.btn = true;
							this.btns = false;
						}
					})
				}
			},
			//保存按钮时新增
			_sureBtn() {
				getaddlist(this.formItem).then(res => {
					console.log(this.formItem);
					if(res.code === ERR_OK) {
						this.$router.push('/home/depManagement/tiwei')
						this.$Notice.success({
							title: '新增成功'
						});
					} else {
						this.$Notice.warning({
							title: '新增失败'
						})
					}
				})
			},
			//页面点击修改按钮
			_gettiaoeditList() {
				geteditlist(this.formItem).then(res => {
					console.log(res);
					if(res.code === ERR_OK) {
						this.$Notice.success({
							title: '修改成功'
						});
						this.$router.push('/home/depManagement/tiwei');
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.amap-demo {
		padding-top: 20px;
		height: 400px;
	}
	
	.tiweiweihu {
		height: 100%;
		.title {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: row;
			width: 100%;
			background: rgb(237, 246, 250);
			height: 50px;
			line-height: 50px;
			padding-left: 10px;
			>span {
				font-size: 14px;
				font-weight: 600;
			}
		}
		.edit {
			width: 100%;
			height: 100%;
			padding: 10px;
			padding-top: 60px;
			background: #fff;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			.title {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				flex-direction: row;
				width: 100%;
				background: rgb(237, 246, 250);
				height: 50px;
				line-height: 50px;
				padding-left: 10px;
				>span {
					font-size: 14px;
					font-weight: 600;
				}
			}
			>.editHead {
				border-bottom: 1px solid #ccc;
				margin-bottom: 20px;
				>span {
					display: inline-block;
					height: 30px;
					line-height: 30px;
					font-size: 14px;
					font-weight: 500;
					border-bottom: 2px solid rgb(12, 102, 204);
				}
			}
			>.editcontant {
				margin-bottom: 20px;
				.ed-table {
					width: 100%;
					tr {
						height: 50px;
						.ed-label {
							width: 150px;
							background: #edf6fa;
							text-align: center;
						}
						.ta-label {
							margin: 0 auto;
						}
						.ed-content {
							padding: 5px 1%;
							.more {
								width: 30px;
								height: 30px;
								border: 1px solid #ccc;
								text-align: center;
								line-height: 30px;
								color: #ccc;
								font-size: 20px;
							}
							.more:hover {
								border-color: #b6e1fc;
								color: #b6e1fc;
								cursor: pointer;
							}
						}
						td {
							border: 1px solid #ccc;
							padding: 0;
							input[type='text'] {
								width: 100%;
								height: 40px;
								border: none;
								padding: 10px;
							}
						}
					}
				}
			}
		}
		.search {
			margin-bottom: 15px;
			.searchBtn {
				display: inline-block;
			}
		}
	}
	
	#myMap1 {
		width: 100%;
		height: 450px;
	}
	
	.addbtn {
		width: 70px;
		height: 40px;
		color: #FFF5E6;
		background-color: #41B0FF;
		border-radius: 10px;
		margin-top: 10px;
	}
</style>