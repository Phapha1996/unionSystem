package glut.proposal.action;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;
import glut.action.BaseAction;
import glut.activity.action.AdminAction;
import glut.db.auto.Proposal;
import glut.proposal.service.UserService;
import glut.util.Constants;
import glut.util.JSONFormat;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;

@Controller("userAction_pro")
@Scope("prototype")
public class UserAction extends BaseAction {
	private Proposal proposal;
	private UserService userService;
	private String name;
	private String JSONProposals;

	// 用于不同等级的部门追踪提案,如:教代会->提案委员会->相关部门->校长 对应1->2->3->4
	private String dpmLV;
	private String trackWay;
	private static Logger logger = Logger.getLogger(AdminAction.class);
	private String proId;

	private String replyContent;
	// modification advice 领导退回相关部门回复时给出的修改建议
	private String mdfAdv;

	private String keyWord_dpm;
	private String keyWord_category;
	private String keyWord_name;
	private String keyWord_year;
	private String keyWord_title;

	private String account;
	private String advice;
	private String mainUnit;
	private String assistantUnit;
	// 存放已选择的列的DataIndex,可用于接收会员信息的页面
	private String dataIndex;

	public String SupporterJudgement() throws Exception {
		logger.debug("*******SupporterJudgement*******");
		logger.debug(name);
		try {
			if (userService.isSupporter(name)) {
				logger.debug("*******success*******");
				sendMsg2Client(Constants.JSON_SUCCESS);
			} else {
				logger.debug("*******failure*******");
				sendMsg2Client(Constants.JSON_FAILURE);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	// 教代会代表功能
	public String submitProposal() throws Exception {
		logger.debug("*******submitProposal*******");
		logger.debug(proposal.toString());
		try {
			userService.submitProposal(proposal);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}
		sendMsg2Client(Constants.JSON_SUCCESS);

		return null;
	}

	public String comment() throws Exception {
		try {
			userService.comment(proposal);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}
		sendMsg2Client(Constants.JSON_SUCCESS);

		return null;
	}

	public String feedBack() throws Exception {
		try {
			userService.feedBack(proposal);
			sendMsg2Client(Constants.JSON_SUCCESS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String proposalTracing() throws Exception {
		logger.debug("****proposalTracing***");
		List<Proposal> proposals = null;
		try {
			// 提案追踪的用户如果是教代会代表
			if ("delegate".equals(trackWay)) {
				proposals = userService.findProposals("submitterName='" + name
						+ "'");
			} else if ("relevantDpm".equals(trackWay)) {
				String tempDpm = URLDecoder.decode(keyWord_dpm, "UTF-8");
				//System.out.println("......."+tempDpm+keyWord_dpm);
				proposals = userService.findProposals("mainUnit='" + tempDpm
						+ "' OR assistantUnit='" + tempDpm + "'");
			} else if ("committeeMb".equals(trackWay)) {// 如果是提案委员,查询到的内容应该是未经他审批过的提案.
				proposals = userService
						.findProposals("p.nextUnit>="
								+ dpmLV
								+ " and p.id not in (select cm.proposalId from CmtMbAdv4Proposal cm where cm.member.id='"
								+ account + "') and p.committeeAdv is null");
			} else if ("committeeChief".equals(trackWay)) {// 如果是提案委员会,根据proposal的下一个需要的审核部门来返回提案追踪信息
				proposals = userService.findProposals("nextUnit>=" + dpmLV
						+ " and committeeAdv is null");
			} else if ("committee".equals(trackWay)) {// 如果是提案委员会,根据proposal的下一个需要的审核部门来返回提案追踪信息
/*				proposals = userService.findProposals("nextUnit>=" + dpmLV
						+ " and committeeAdv is not null");*/
				/*m by yattie: 委员会跟踪提案，可以查看未决定的提案*/
				proposals = userService.findProposals("nextUnit>=" + dpmLV);				
			} else if ("leader".equals(trackWay)) {// 如果是提案委员会,根据proposal的下一个需要的审核部门来返回提案追踪信息
				//String leader = java.net.URLDecoder.decode(name, "UTF-8");
//				System.out.println("领导："+leader);
				proposals = userService.findProposals("responseLeader='" + name
						+ "'");
			}
			String json = JSONFormat.covert2ExtjsGrid(proposals);
			logger.debug("返回的提案:" + json);
			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	// 提案委员会功能
	public String approveProposal() throws Exception {
		logger.debug("****proposalTracing***");
		try {
			userService.apporveProposal(proposal);
			sendMsg2Client(Constants.JSON_SUCCESS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String approveProposalCommon() throws Exception {
		logger.debug("****proposalTracing***");
		try {
			logger.debug(proId + "," + account + "," + mainUnit + ","
					+ assistantUnit + "," + advice);
			userService.apporveProposalCommon(proId, account, mainUnit,
					assistantUnit, advice);
			sendMsg2Client(Constants.JSON_SUCCESS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String updateProposal() throws Exception {
		System.out.println("updateProposal");
		logger.debug("这里是 JSONProposal" + JSONProposals);
		try {
			if ("4".equals(dpmLV)) {
				userService.updateProposal(null, dpmLV, mdfAdv, proId);
			} else {
				List<Proposal> newProposals = JSON.parseArray(JSONProposals,
						Proposal.class);
				userService.updateProposal(newProposals, dpmLV, mdfAdv, null);
			}

			sendMsg2Client(Constants.JSON_SUCCESS);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String reply() throws Exception {
		logger.debug("这里是回复的内容" + replyContent);
		try {
			userService.reply(dpmLV, replyContent, proId);
			sendMsg2Client(Constants.JSON_SUCCESS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String exportProposal() throws Exception {
		String folderName = "export";
		String subPath = "/sys_pro/" + folderName;

		String tempDocPath = ServletActionContext.getServletContext()
				.getRealPath(subPath);
		List<Proposal> pro = userService.findProposals("id='" + proId + "'");
		Proposal tempPro = pro.get(0);
		String tempDocName = proId + ".doc";
		logger.debug("提案doc路径：" + tempDocPath + "\\" + tempDocName);

		try {

			createDoc(tempPro, tempDocPath, tempDocName);
			sendMsg2Client(folderName + "/" + tempDocName);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String findProposal4Leader() throws Exception {
		logger.debug("****findProposal4Leader***");
		List<Proposal> proposals = null;
		try {
			// 用keyword_dpm存放领导查询提案的关键字
			proposals = userService.findProposals("title like '%" + keyWord_dpm
					+ "%'");
			String json = JSONFormat.covert2ExtjsGrid(proposals);
			logger.debug("返回的提案:" + json);
			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String findSpecifiedProposals() throws Exception {
		logger.debug("****findSpecifiedProposals***");
		// logger.debug(java.net.URLDecoder.decode(keyWord_category,
		// "UTF-8")
		// + "=======" + keyWord_category);
		Map<String, String> params = new HashMap<>();
		if (keyWord_category != null) {
			params.put("category",
					java.net.URLDecoder.decode(keyWord_category, "UTF-8"));
		}
		if (keyWord_dpm != null) {
			params.put("submitterDpm",
					java.net.URLDecoder.decode(keyWord_dpm, "UTF-8"));
		}
		if (keyWord_name != null) {
			params.put("submitterName",
					java.net.URLDecoder.decode(keyWord_name, "UTF-8"));
		}
		if (keyWord_year != null) {
			params.put("submitDate",
					java.net.URLDecoder.decode(keyWord_year, "UTF-8"));
		}
		if (keyWord_title != null) {
			params.put("title",
					java.net.URLDecoder.decode(keyWord_title, "UTF-8"));
		}
		logger.debug("****findSpecifiedProposals***");
		List<Proposal> proposals = null;
		try {
			// 提案追踪的用户如果是教代会代表
			proposals = userService.findProposals4Export(params);
			// if (keyWord_category != null && keyWord_dpm != null) {
			// logger.debug("****if***");
			// proposals = userService.findProposals4Export("category",
			// java.net.URLDecoder.decode(keyWord_category, "UTF-8"),
			// "submitterDpm",
			// java.net.URLDecoder.decode(keyWord_dpm, "UTF-8"));
			// } else if (keyWord_category != null) {
			// logger.debug("****else if 1***");
			// proposals = userService.findProposals4Export("category",
			// java.net.URLDecoder.decode(keyWord_category, "UTF-8"),
			// "'1'", "1");
			// } else if (keyWord_dpm != null) {
			// logger.debug("****else if 2***");
			// proposals = userService.findProposals4Export("'1'", "1",
			// "submitterDpm",
			// java.net.URLDecoder.decode(keyWord_dpm, "UTF-8"));
			// }
			String json = JSONFormat.covert2ExtjsGrid(proposals);
			logger.debug("返回的提案:" + json);
			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String findAllProposals() throws Exception {
		logger.debug("****proposalTracing***");
		List<Proposal> proposals = null;
		try {
			// 意思是恒成立,查找所有提案.
			proposals = userService.findProposals("'1'='1'");
			String json = JSONFormat.covert2ExtjsGrid(proposals);
			logger.debug("返回的提案:" + json);
			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	// 查找委员们对提案提的所有意见
	public String findCmtMbAdv() throws Exception {
		logger.debug("****findCmtMbAdv***");
		try {
			String json = userService.findCmtMbAdv(proId);
			logger.debug("返回的提案:" + json);
			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	@SuppressWarnings("resource")
	private void createDoc(Proposal pps, String tempDocPath, String tempDocName)
			throws Exception {
		// TODO Auto-generated method stub

		String templatePath = ServletActionContext.getServletContext()
				.getRealPath("/sys_pro/template/");

		Configuration cfg = new Configuration();
		cfg.setDefaultEncoding("utf-8");
		cfg.setDirectoryForTemplateLoading(new File(templatePath));
		cfg.setObjectWrapper(new DefaultObjectWrapper());

		Template temp = cfg.getTemplate("template.ftl");
		temp.setEncoding("utf-8");

		HashMap contentValue = new HashMap<>();

		Calendar submitDate = Calendar.getInstance();
		submitDate.setTime(pps.getSubmitDate());

		logger.debug("这里是年月日" + submitDate.get(Calendar.YEAR)
				+ (submitDate.get(Calendar.MONTH) + 1)
				+ submitDate.get(Calendar.DAY_OF_MONTH) + "|" + pps.toString());

		String year = submitDate.get(Calendar.YEAR) + "";
		String month = (submitDate.get(Calendar.MONTH) + 1) + "";
		String day = submitDate.get(Calendar.DAY_OF_MONTH) + "";
		String pid = pps.getId();
		String department = pps.getSubmitterDpm();
		String name = pps.getSubmitterName();
		String phone = pps.getSubmitterPhone();
		String supporter1 = pps.getSupporter1();
		String supporter2 = pps.getSupporter2();
		String category = pps.getCategory();
		String title = pps.getTitle();
		String reason = pps.getReason();
		if (reason != null){
			reason=reason.replaceAll("\n", "<w:p></w:p>");
		}
		String action = pps.getAction();
		/*add by yattie 表格内换行*/
		if (action != null){
			action=action.replaceAll("\n", "<w:p></w:p>");
		}
		// add by xupk
		String committeeAdv = pps.getCommitteeAdv();
		String mainUnit = pps.getMainUnit();
		String assistantUnit = pps.getAssistantUnit();
		String progress = pps.getProgress();
		String replyContent = pps.getReplyContent();
		if (replyContent != null){
			replyContent=replyContent.replaceAll("\n", "<w:p></w:p>");
		}
		String comment = pps.getComment();

		logger.debug(year + month + day + pid + department + name + phone
				+ supporter1 + supporter2 + category + title + reason + action);

		contentValue.put("year", year);
		contentValue.put("month", month);
		contentValue.put("day", day);
		contentValue.put("pid", pid);
		contentValue.put("department", department);
		contentValue.put("name", name);
		contentValue.put("phone", phone);
		contentValue.put("supporter1", supporter1);
		contentValue.put("supporter2", supporter2);
		contentValue.put("category", category);
		contentValue.put("title", title);
		contentValue.put("reason", reason);
		contentValue.put("action", action);
		// add by xu
		contentValue.put("committeeAdv", committeeAdv);
		contentValue.put("mainUnit", mainUnit);
		contentValue.put("assistantUnit", assistantUnit);
		contentValue.put("progress", progress);
		contentValue.put("replyContent", replyContent);
		contentValue.put("comment", comment);

		File file = new File(tempDocPath, tempDocName);

		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}

		FileOutputStream fos = new FileOutputStream(file);
		OutputStreamWriter osw = new OutputStreamWriter(fos, "utf-8");
		BufferedWriter bw = new BufferedWriter(osw);

		fos.flush();
		osw.flush();
		bw.flush();

		temp.process(contentValue, bw);

		fos.close();
		osw.close();
		bw.close();

		logger.debug("输出完成");

	}

	public String exportSpecifiedProposals() throws Exception {

		Map<String, String> params = new HashMap<>();
		if (keyWord_category != null) {
			params.put("category",
					java.net.URLDecoder.decode(keyWord_category, "UTF-8"));
		}
		if (keyWord_dpm != null) {
			params.put("submitter_dpm",
					java.net.URLDecoder.decode(keyWord_dpm, "UTF-8"));
		}
		if (keyWord_name != null) {
			params.put("submitter_name",
					java.net.URLDecoder.decode(keyWord_name, "UTF-8"));
		}
		if (keyWord_year != null) {
			params.put("submit_date",
					java.net.URLDecoder.decode(keyWord_year, "UTF-8"));
		}
		logger.debug("****findSpecifiedProposals***");
		List<Proposal> excelData = userService
				.loadSpecifiedProposalsFromDB(params);

		String folderName = "createdExcel";
		String subPath = "/sys_pro/" + folderName;

		String tempExcelPath = ServletActionContext.getServletContext()
				.getRealPath(subPath);

		String tempExcelName = "tempExcel.xls";

		try {
			createExcel(excelData, tempExcelPath, tempExcelName);

			sendMsg2Client(folderName + "/" + tempExcelName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 创建excel失败要告诉客户端
			sendMsg2Client(Constants.JSON_FAILURE);
		}
		return null;
	}

	/**
	 * @author xupk 20151221
	 * 
	 * */
	public String exportAllProposals() throws Exception {
		List excelData = null;
		excelData = (ArrayList<Object[]>) userService.loadExcelFromDB();
		String folderName = "createdExcel";
		String subPath = "/sys_pro/" + folderName;

		String tempExcelPath = ServletActionContext.getServletContext()
				.getRealPath(subPath);

		String tempExcelName = "tempExcel.xls";

		try {
			createExcel(excelData, tempExcelPath, tempExcelName);

			sendMsg2Client(folderName + "/" + tempExcelName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 创建excel失败要告诉客户端
			sendMsg2Client(Constants.JSON_FAILURE);
		}
		return null;
	}

	/**
	 * @author xupk 20151221
	 * */
	private void createExcel(List excelData, String tempExcelPath,
			String tempExcelName) throws IOException, RowsExceededException,
			WriteException {

		File excelFile = new File(tempExcelPath, tempExcelName);

		if (!excelFile.getParentFile().exists()) {
			excelFile.getParentFile().mkdirs();
		}

		WritableWorkbook wwb = Workbook.createWorkbook(excelFile);
		WritableSheet ws = wwb.createSheet("Sheet1", 0);

		// if (header != null) {
		// String[] headers = header.split(",");
		// for (int col = 0; col < headers.length; col++) {
		// ws.addCell(new Label(col, 0, headers[col]));
		// }
		// // 用于防止只选择了一列的情况.因为如果只选择一列,返回的list会是Object类型,而不是Object[]
		// if (headers.length == 1) {
		// for (int row = 0; row < excelData.size(); row++) {
		// Object rowData = excelData.get(row);
		// String cellData = "";
		// if (rowData instanceof Date) {
		// cellData = new SimpleDateFormat("yyyy-MM-dd")
		// .format(rowData);
		// } else {
		// cellData = "" + rowData;
		// }
		// ws.addCell(new Label(0, row + 1, cellData));
		// }
		// wwb.write();
		//
		// wwb.close();
		//
		// return;
		// }
		//
		// } else {
		for (int col = 0; col < ((Object[]) excelData.get(0)).length; col++) {
			ws.addCell(new Label(col, 0, Constants.EXCEL_PPS_COL_NAME[col]));
		}
		// }

		for (int row = 0; row < excelData.size(); row++) {
			Object[] rowData = (Object[]) excelData.get(row);
			for (int col = 0; col < rowData.length; col++) {
				String cellData = "";
				if (rowData[col] instanceof Date) {
					cellData = new SimpleDateFormat("yyyy-MM-dd")
							.format(rowData[col]);
				} else {
					cellData = "" + rowData[col];
				}
				ws.addCell(new Label(col, row + 1, cellData));
			}
		}

		wwb.write();

		wwb.close();

	}

	// getter setter
	public Proposal getProposal() {
		return proposal;
	}

	public void setProposal(Proposal proposal) {
		this.proposal = proposal;
	}

	@Resource(name = "userServiceImp_pro")
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) throws UnsupportedEncodingException {
		this.name = URLDecoder.decode(name, "UTF-8");
	}

	public String getTrackWay() {
		return trackWay;
	}

	public void setTrackWay(String trackWay) {
		this.trackWay = trackWay;
	}

	public String getDpmLV() {
		return dpmLV;
	}

	public void setDpmLV(String dpmLV) {
		this.dpmLV = dpmLV;
	}

	public String getJSONProposals() {
		return JSONProposals;
	}

	public void setJSONProposals(String jSONProposals) {
		JSONProposals = jSONProposals;
	}

	public String getProId() {
		return proId;
	}

	public void setProId(String proId) {
		this.proId = proId;
	}

	public String getKeyWord_dpm() {
			return keyWord_dpm;
	}

	public void setKeyWord_dpm(String keyWord_dpm) {
		try {
			this.keyWord_dpm = URLDecoder.decode(keyWord_dpm, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String getKeyWord_category() {
		return keyWord_category;
	}

	public void setKeyWord_category(String keyWord_category) {
		this.keyWord_category = keyWord_category;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getAdvice() {
		return advice;
	}

	public void setAdvice(String advice) {
		this.advice = advice;
	}

	public String getMainUnit() {
		return mainUnit;
	}

	public void setMainUnit(String mainUnit) {
		this.mainUnit = mainUnit;
	}

	public String getAssistantUnit() {
		return assistantUnit;
	}

	public void setAssistantUnit(String assistantUnit) {
		this.assistantUnit = assistantUnit;
	}

	public String getReplyContent() {
		return replyContent;
	}

	public void setReplyContent(String replyContent) {
		this.replyContent = replyContent;
	}

	public String getMdfAdv() {
		return mdfAdv;
	}

	public void setMdfAdv(String mdfAdv) {
		this.mdfAdv = mdfAdv;
	}

	public String getDataIndex() {
		return dataIndex;
	}

	public void setDataIndex(String dataIndex) {
		this.dataIndex = dataIndex;
	}

	public String getKeyWord_name() {
		return keyWord_name;
	}

	public void setKeyWord_name(String keyWord_name) {
		this.keyWord_name = keyWord_name;
	}

	public String getKeyWord_year() {
		return keyWord_year;
	}

	public void setKeyWord_year(String keyWord_year) {
		this.keyWord_year = keyWord_year;
	}

	public String getKeyWord_title() {
		return keyWord_title;
	}

	public void setKeyWord_title(String keyWord_title) {
		this.keyWord_title = keyWord_title;
	}

}
