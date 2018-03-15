<template>
	<div class="shuikuweihu">
		<div class="title">
			<BreadcrumbItem>新增</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="edit">
			<div class="title">
				<span>位置： </span>
				<Breadcrumb separator=">">
					<BreadcrumbItem to="/home/depManagement/shuiku">部门管理</BreadcrumbItem>
					<BreadcrumbItem>
						<a href="javascript:;" @click='cancel'>水库数据</a>
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
								<td class="ed-label">地址</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="address" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.address"></Input>
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
								<td class="ed-label">联系电话</td>
								<td class="ed-content">
									<FormItem label="" prop="contact" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.contact"></Input>
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

								<td class="ed-label">镇(街)</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="governor" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.governor"></Input>
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
								<td class="ed-label">采用面积</td>
								<td class="ed-content">
									<FormItem label="" prop="base_cover" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.base_cover"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">名称</td>
								<td class="ed-content">
									<FormItem label="" prop="pool_name" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.pool_name"></Input>
									</FormItem>
								</td>

								<td class="ed-label">建设时间</td>
								<td class="ed-content">
									<FormItem label="" prop="stn_no" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.stn_no"></Input>
									</FormItem>
								</td>
								<td class="ed-label">兴建时间</td>
								<td class="ed-content">
									<FormItem label="" prop="build" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.build"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">编号</td>
								<td class="ed-content">
									<FormItem label="" prop="plan_name" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.plan_name"></Input>
									</FormItem>
								</td>
								<td class="ed-label">校核总库容（万m³）</td>
								<td class="ed-content">
									<FormItem label="" prop="check_capacity" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.check_capacity"></Input>
									</FormItem>
								</td>
								<td class="ed-label">调节库容(万m³)</td>
								<td class="ed-content">
									<FormItem label="" prop="design_capacity" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.design_capacity"></Input>
									</FormItem>
								</td>

							</tr>
							<tr>
								<td class="ed-label">校核水位(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="check_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.check_level"></Input>
									</FormItem>
								</td>
								<td class="ed-label">校核标准</td>
								<td class="ed-content">
									<FormItem label="" prop="check_standard" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.check_standard"></Input>
									</FormItem>
								</td>
								<td class="ed-label">反滤设施</td>
								<td class="ed-content">
									<FormItem label="" prop="filter_device" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.filter_device"></Input>
									</FormItem>
								</td>
							</tr>
							<!--设计-->
							<tr>
								<td class="ed-label">设计库容 (万立方米)</td>
								<td class="ed-content">
									<FormItem label="" prop="design_capacity" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.design_capacity"></Input>
									</FormItem>
								</td>
								<td class="ed-label">设计水位(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="design_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.design_level"></Input>
									</FormItem>
								</td>
								<td class="ed-label">设计标准</td>
								<td class="ed-content">
									<FormItem label="" prop="design_standard" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.design_standard"></Input>
									</FormItem>
								</td>
							</tr>
							<!--死库容-->
							<tr>
								<td class="ed-label">死库容 (万立方米)</td>
								<td class="ed-content">
									<FormItem label="" prop="dead_capacity" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.dead_capacity"></Input>
									</FormItem>
								</td>
								<td class="ed-label">死水位(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="dead_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.dead_level"></Input>
									</FormItem>
								</td>
							</tr>
							<!--坡-->
							<tr>
								<td class="ed-label">背水坡</td>
								<td class="ed-content">
									<FormItem label="" prop="dike_downstream" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.dike_downstream"></Input>
									</FormItem>
								</td>
								<td class="ed-label">坝型</td>
								<td class="ed-content">
									<FormItem label="" prop="dike_type" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.dike_type"></Input>
									</FormItem>
								</td>
								<td class="ed-label">迎水坡</td>
								<td class="ed-content">
									<FormItem label="" prop="dike_upstream" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.dike_upstream"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<!--<td class="ed-label">反滤设施</td>
								<td class="ed-content">
									<FormItem label="" prop="filter_device" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.filter_device"></Input>
									</FormItem>
								</td>-->
								<td class="ed-label">溢洪流量(立米/秒)</td>
								<td class="ed-content">
									<FormItem label="" prop="flood_flow" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.flood_flow"></Input>
									</FormItem>
								</td>
								<td class="ed-label">汛限水位(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="flood_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.flood_level"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">溢洪道顶高程(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="flood_topheight" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.flood_topheight"></Input>
									</FormItem>
								</td>
								<td class="ed-label">溢洪道顶宽(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="flood_width" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.flood_width"></Input>
									</FormItem>
								</td>
								<td class="ed-label">历史最高水位（米）</td>
								<td class="ed-content">
									<FormItem label="" prop="history_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.history_level"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">历史最高水位出现时间</td>
								<td class="ed-content">
									<FormItem label="" prop="history_time" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.history_time"></Input>
									</FormItem>
								</td>
								<td class="ed-label">最大坝高(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="maindike_height" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.maindike_height"></Input>
									</FormItem>
								</td>
								<td class="ed-label">坝顶高程(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="maindike_length" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.maindike_length"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">主坝长(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="maindike_topheight" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.maindike_topheight"></Input>
									</FormItem>
								</td>
								<td class="ed-label">坝顶宽(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="maindike_width" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.maindike_width"></Input>
									</FormItem>
								</td>
								<td class="ed-label">正常库容(万立方米)</td>
								<td class="ed-content">
									<FormItem label="" prop="normal_capacity" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.normal_capacity"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">正常水位(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="normal_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.normal_level"></Input>
									</FormItem>
								</td>
								<td class="ed-label">耕地 (万亩)</td>
								<td class="ed-content">
									<FormItem label="" prop="plough" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.plough"></Input>
									</FormItem>
								</td>
								<td class="ed-label">集雨面积(平方公里)</td>
								<td class="ed-content">
									<FormItem label="" prop="rainwater_area" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.normal_capacity"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">副坝坝长(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="subdike_length" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.subdike_length"></Input>
									</FormItem>
								</td>
								<td class="ed-label">副坝最大坝高(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="subdike_maxheight" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.subdike_maxheight"></Input>
									</FormItem>
								</td>
								<td class="ed-label">副坝数量</td>
								<td class="ed-content">
									<FormItem label="" prop="subdike_qty" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.subdike_qty"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">副坝坝顶高程(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="subdike_topheight" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.subdike_topheight"></Input>
									</FormItem>
								</td>
								<td class="ed-label">放水涵管最大流量(立米/秒)</td>
								<td class="ed-content">
									<FormItem label="" prop="water_flow" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.water_flow"></Input>
									</FormItem>
								</td>

							</tr>
							<tr>
								<td class="ed-label">断面尺寸(宽×高)/孔数 (米)</td>
								<td class="ed-content" colspan="5">
									<FormItem label="" prop="water_fracture" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.water_fracture"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">放水涵管管长 (米)</td>
								<td class="ed-content">
									<FormItem label="" prop="water_length" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.water_length"></Input>
									</FormItem>
								</td>
								<td class="ed-label">放水涵管结构</td>
								<td class="ed-content">
									<FormItem label="" prop="water_structure" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.water_structure"></Input>
									</FormItem>
								</td>
								<td class="ed-label">主(副)坝防浪块</td>
								<td class="ed-content">
									<FormItem label="" prop="wave_device" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.wave_device"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">放水涵管底高程(米)</td>
								<td class="ed-content">
									<FormItem label="" prop="water_height" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.water_height"></Input>
									</FormItem>
								</td>
								<td class="ed-label">校核洪水位（m）</td>
								<td class="ed-content">
									<FormItem label="" prop="check_flow_level" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.check_flow_level"></Input>
									</FormItem>
								</td>
								<td class="ed-label">设计洪峰流量（m³/s）</td>
								<td class="ed-content">
									<FormItem label="" prop="design_flow" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.design_flow"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">受影响人数</td>
								<td class="ed-content">
									<FormItem label="" prop="affected_population" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.affected_population"></Input>
									</FormItem>
								</td>

							</tr>
							<!--<tr>
								<td class="ed-label">校核洪水位（m）</td>
								<td class="ed-content">
									<FormItem label="" prop="check_flow" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.check_flow"></Input>
									</FormItem>
								</td>
								<td class="ed-label">设计洪峰流量（m³/s）</td>
								<td class="ed-content">
									<FormItem label="" prop="design_flow" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.design_flow"></Input>
									</FormItem>
								</td>
								<td class="ed-label">校核洪峰流量（m³/s）</td>
								<td class="ed-content">
									<FormItem label="" prop="check_flow" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.check_flow"></Input>
									</FormItem>
								</td>
							</tr>-->
							<tr>
								<td class="ed-label">管理单位</td>
								<td class="ed-content">
									<FormItem label="" prop="organization" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.organization"></Input>
									</FormItem>
								</td>
								<td class="ed-label">主管部门</td>
								<td class="ed-content">
									<FormItem label="" prop="town" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.town"></Input>
									</FormItem>
								</td>
								<td class="ed-label">工程任务</td>
								<td class="ed-content">
									<FormItem label="" prop="project_target" style="margin: 0">
										<Select placeholder="请选择" style="width:80%" v-model="formItem.project_target" :disabled="formDisabled" @on-change='planTypeSelect'>
											<Option value="防洪">防洪</Option>
											<Option value="灌溉 ">灌溉 </Option>
											<Option value="供水">供水</Option>
											<Option value="发电 ">发电 </Option>
											<Option value="其他 ">其他 </Option>
										</Select>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">信息化设备</td>
								<td class="ed-content">
									<FormItem label="" style="margin: 0" prop="Information_equipment">
										<RadioGroup v-model="formItem.Information_equipment">
											<Radio label="有">有</Radio>
											<Radio label="无">无</Radio>
										</RadioGroup>
									</FormItem>
								</td>
								<td class="ed-label">重要保护对象</td>
								<td class="ed-content" colspan="3">
									<FormItem label="" prop="protection_object" style="margin: 0">
										<Select placeholder="请选择" style="width:80%" v-model="formItem.protection_object" :disabled="formDisabled" @on-change='planTypeSelect' filterable>
											<Option value="城镇">城镇</Option>
											<Option value="工矿企业 ">工矿企业 </Option>
											<Option value="农田  ">农田 </Option>
											<Option value="铁路 ">铁路 </Option>
											<Option value="公路  ">公路 </Option>
											<Option value="通讯设施  ">通讯设施</Option>
											<Option value="其他  ">其他</Option>
										</Select>
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
										<Select placeholder="请选择" style="width:80%" v-model="formItem.safety_evaluation.safety_type" :disabled="formDisabled" @on-change='planTypeSelect' filterable>
											<Option value="一类坝">一类坝</Option>
											<Option value="二类坝 ">二类坝 </Option>
											<Option value="三类坝  ">三类坝 </Option>
										</Select>
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
								<td class="ed-label">大坝安全管理应急预案是否编辑</td>
								<td class="ed-content">
									<FormItem label="" prop="have_emergency_plan" style="margin: 0">
										<RadioGroup v-model="formItem.have_emergency_plan">
											<Radio label="是端">是</Radio>
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
									<FormItem label="" prop="warehouse_statistics.cloth" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.cloth"></Input>
									</FormItem>
								</td>
								<td class="ed-label">砂石(m³)</td>
								<td class="ed-content">
									<FormItem label="" prop="warehouse_statistics.sand" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.sand"></Input>
									</FormItem>
								</td>
							</tr>
							<tr>
								<td class="ed-label">块石（m³）</td>
								<td class="ed-content">
									<FormItem label="" prop="warehouse_statistics.block_stone" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.block_stone"></Input>
									</FormItem>
								</td>
								<td class="ed-label">救生衣(件)</td>
								<td class="ed-content">
									<FormItem label="" prop="warehouse_statistics.life_jacket" style="margin: 0">
										<Input placeholder="请输入" style="width:80%" v-model="formItem.warehouse_statistics.life_jacket"></Input>
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
					<br />
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
				<Button type="primary" @click="_sureBtn" v-if="btns">保存</Button>
				<Button type="warning" @click="_gettiaoeditList" v-if="btn">修改保存</Button>
			</div>
		</div>
	</div>
</template>

<script>
	import { preTaskThead, shequThead } from 'common/js/table'
	import { initTime } from 'common/js/util'
	import { depTaskQuery } from 'common/js/query'
	//	import { presetTask } from 'common/js/rules'
	import { mapGetters, mapMutations } from 'vuex';
	import { getpresetTaskList, addpresetTask, editpresetTask, deletepresetTask } from 'api/task_management'
	import { getDepList } from 'api/bumenlist'
	import { getUserList, getaddlist, geteditlist } from 'api/shuiku'
	import { ERR_OK } from 'api/config'
	import { successNotice, errorNotice, getLocalStorage, senActive } from 'common/js/dom'
	import vueAMap from 'vue-amap';
	let amapManager = new vueAMap.AMapManager();
	export default {
		computed: {
			...mapGetters([
				'SHUIKU'
			])
		},
		data() {
			return {
				amapManager,
				zoom: 12,
				center: [113.17213016912342, 23.02122420436683],
				events: {
					init: (o) => {
//						console.log(o.getCenter())
						console.log(this.$refs.map.$$getInstance())
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
//							console.log(o);
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
				tdthead:new Array(1),
				tableThead: shequThead(this),
				tableTbody: [],
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
					safety_evaluation: {},
					administrator: {},
					technical_director: {},
					emergency_team: {},
					warehouse_statistics: {},
					operator: {}
				},
				//				ruleValidate: presetTask,
				disabled: false,
				moduleTitle: '新增',
				total: 0,
				searchVal: {
					department_name: '',
					task_type: '',
				},
				depList: depTaskQuery().depList,
				typeList: depTaskQuery().typeList,
				postObj: {
					'page': 1,
					'pageSize': 10,
					'order': {
						_id: -1
					},
					'searchValue': {}
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
				this.$router.push('/home/depManagement/shuiku')
			},
			add() {
				this.disabled = true
				this.moduleTitle = '新增'
				this.formItem = {}
			},
			//表格显示
			_getuserlist(search) {
				search = {
					_id: this.id
				}
				if(getLocalStorage('id') != 'false') {
					getUserList(search).then(res => {
						console.log(res);
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
					if(res.code === ERR_OK) {
						this.$router.push('/home/depManagement/shuiku')
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
						this.$router.push('/home/depManagement/shuiku');
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
	
	.shuikuweihu {
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
	}
</style>