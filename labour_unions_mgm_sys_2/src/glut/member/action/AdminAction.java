package glut.member.action;

import glut.action.BaseAction;
import glut.db.auto.Member;
import glut.member.service.AdminService;
import glut.util.Constants;
import glut.util.JSONFormat;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

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

import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.PropertyFilter;
import com.alibaba.fastjson.serializer.SerializeWriter;

@Controller("adminAction_mb")
@Scope("prototype")
public class AdminAction extends BaseAction {
	private AdminService adminService;
	// 存放已选择的列的DataIndex,可用于接收会员信息的页面
	private String dataIndex;
	// 存放已选择的列的Header,主要用于构造excel
	private String header;
	private Member member;
	private File excel;
	private String excelFileName;
	private String excelContentType;
	private String keyWord;
	private static Logger logger = Logger.getLogger(AdminAction.class);
	private String account;
	private String roles;
	private String way;

	public String readExcel() throws Exception {

		String result;
		try {
			// 获取客户端上传的excel在服务器上的位置
			result = adminService.loadExcelToDB(excel);
			// 无异常返回成功
			if (result == null) {
				sendMsg2Client(Constants.JSON_SUCCESS);
			} else {
				// 如果有数据返回，则返回的数据是插入失败生成的文本文件的下载地址
				sendMsg2Client("{success:true,msg:'" + result + "'}");
				// HttpServletResponse response =
				// ServletActionContext.getResponse();
				// response.setHeader("Content-type",
				// "text/plain;charset=UTF-8");
				// response.getWriter().println("{success:true,msg:'"+result+"'}");
				// response.getWriter().flush();
				// response.setHeader("Content-type","application/octet-stream");
				// //高速浏览器传递的是文件流
				// response.setHeader("Content-Disposition","attachment; filename="+result);
				// //指定文件名
				// response.getWriter().println();
				// response.getWriter().flush();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 有异常返回失败
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String sendData2Client() throws Exception {
		List<Member> excelData = adminService.loadExcelFromDB(dataIndex);

		String json = JSONFormat.covert2ExtjsGrid(excelData);

		sendMsg2Client(json);

		return null;
	}

	public String findRolesByAccount() throws Exception {
		// 通过客户端选择的字段来查询会员信息
		String roles = adminService.findRolesByAccount(account);

		sendMsg2Client(roles);

		return null;
	}

	public String exportAllData() throws Exception {
		// 通过客户端选择的字段来查询会员信息
		logger.debug("这里是要输出来的字段:" + dataIndex + "," + header);
		List excelData = null;
		if (header != null && header.split(",").length == 1) {
			excelData = (ArrayList<Object>) adminService
					.loadExcelFromDB(dataIndex);
		} else {
			excelData = (ArrayList<Object[]>) adminService
					.loadExcelFromDB(dataIndex);
		}

		String folderName = "createdExcel";
		String subPath = "/sys_mb/" + folderName;

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

	public String findMemberInfoByKeyWord() throws Exception {
		List members = new ArrayList<>();
		String json = "";

		String regex = "[0-9]{7}";
		keyWord = URLDecoder.decode(keyWord, "UTF-8");
		logger.debug("关键词：" + keyWord + " ,rg：" + regex);
		// 如果输入的是7位员工号
		if (keyWord.matches(regex)) {
			logger.debug("员工号查询");
			members = adminService.findByNumber(keyWord);
		} else {
			logger.debug("名字查询");
			members = adminService.findByName(keyWord);
		}

		try {
			logger.debug("beforejsonconvertion" + json);
			//过滤属性
			String[] filtered=new String[]{"users","activitySignUps","cmtMbAdv4Proposals"};
			json = JSONFormat.covert2ExtjsGrid(members, filtered);
			logger.debug("json结果：" + json);

			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 创建excel失败要告诉客户端
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String changeMemberInfo() throws Exception {
		// 通过客户端选择的字段来查询会员信息

		try {
			adminService.changeMemberInfo(member);

			sendMsg2Client(Constants.JSON_SUCCESS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 创建excel失败要告诉客户端
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String rolesModification() throws Exception {
		// 通过客户端选择的字段来查询会员信息

		try {
			logger.debug("这里是更改角色信息:" + account + "," + roles + "," + way);
			if ("add".equals(way)) {
				adminService.addRole(account, roles);
			} else {
				adminService.deleteRole(account, roles);
			}
			sendMsg2Client(Constants.JSON_SUCCESS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 创建excel失败要告诉客户端
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	private void createExcel(List excelData, String tempExcelPath,
			String tempExcelName) throws IOException, RowsExceededException,
			WriteException {

		File excelFile = new File(tempExcelPath, tempExcelName);

		if (!excelFile.getParentFile().exists()) {
			excelFile.getParentFile().mkdirs();
		}

		WritableWorkbook wwb = Workbook.createWorkbook(excelFile);
		WritableSheet ws = wwb.createSheet("Sheet1", 0);

		if (header != null) {
			String[] headers = header.split(",");
			for (int col = 0; col < headers.length; col++) {
				ws.addCell(new Label(col, 0, headers[col]));
			}
			// 用于防止只选择了一列的情况.因为如果只选择一列,返回的list会是Object类型,而不是Object[]
			if (headers.length == 1) {
				for (int row = 0; row < excelData.size(); row++) {
					Object rowData = excelData.get(row);
					String cellData = "";
					if (rowData instanceof Date) {
						cellData = new SimpleDateFormat("yyyy-MM-dd")
								.format(rowData);
					} else {
						cellData = "" + rowData;
					}
					ws.addCell(new Label(0, row + 1, cellData));
				}
				wwb.write();

				wwb.close();

				return;
			}

		} else {
			for (int col = 0; col < ((Object[]) excelData.get(0)).length; col++) {
				ws.addCell(new Label(col, 0, Constants.EXCEL_MB_COL_NAME[col]));
			}
		}

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

	// *********************getter setter***************

	public AdminService getAdminService() {
		return adminService;
	}

	@Resource
	public void setAdminService(AdminService adminService) {
		this.adminService = adminService;
	}

	public File getExcel() {
		return excel;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public void setExcel(File excel) {
		this.excel = excel;
	}

	public String getExcelFileName() {
		return excelFileName;
	}

	public void setExcelFileName(String excelFileName) {
		this.excelFileName = excelFileName;
	}

	public String getExcelContentType() {
		return excelContentType;
	}

	public void setExcelContentType(String excelContentType) {
		this.excelContentType = excelContentType;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public String getWay() {
		return way;
	}

	public void setWay(String way) {
		this.way = way;
	}

	public String getDataIndex() {
		return dataIndex;
	}

	public void setDataIndex(String dataIndex) {
		this.dataIndex = dataIndex;
	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}
}
