package glut.activity.action;

import glut.action.BaseAction;
import glut.activity.service.AdminService;
import glut.db.auto.Activity;
import glut.db.auto.ActivitySignUp;
import glut.util.Constants;
import glut.util.JSONFormat;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;

import jxl.Workbook;
import jxl.write.Formula;
import jxl.write.Label;
import jxl.write.WritableHyperlink;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;

@Controller("adminAction_act")
@Scope("prototype")
public class AdminAction extends BaseAction {
	private AdminService adminService;
	private String activityName;
	private Activity activity;
	private String testStr;
	private String JSONActivities;
	private String activityID;
	private String activityGroupID;

	// 上传文件的参数
	private File file; // 具体上传文件的 引用 , 指向临时目录中的临时文件
	private String fileFileName; // 上传文件的名字 ,FileName 固定的写法
	private String fileContentType; // 上传文件的类型， ContentType 固定的写法
	private static Logger logger = Logger.getLogger(AdminAction.class);

	public String myTest() {
		System.out.println(testStr);
		return null;
	}

	// 获取文件后缀
	private static String getExtention(String fileName) {
		int pos = fileName.lastIndexOf(".");
		return fileName.substring(pos);
	}

	public String addActivity() {
		logger.debug("！！！这里是客户端刚提交的activity信息！*******" + activity.toString());
		if (fileFileName == null) {
			try {
				// activity.setTemplate("");
				// System.out.println("1111111"+activity.getAct_location());
				adminService.addActivity(activity,activityGroupID);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				sendMsg2Client(Constants.JSON_FAILURE);
			}
		} else {
			try {
				// 获取文件存储路径
				String path = Constants.getDirUpload()+"/sys_act/template";
				// 定义时间戳
				Date now = Calendar.getInstance().getTime();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmm");
				// 对上传文件进行重命名，规则为act_tpl_+时间戳（当前时间的整型值）
				String fileFileName2 = "act_tpl_" + sdf.format(now)
						+ getExtention(this.getFileFileName());
				// 输出流
				File file2 = new File(path, fileFileName2);

				if (!file2.getParentFile().exists()) {/*判断文件所在目录是否存在*/
					file2.getParentFile().mkdirs();
				}

				OutputStream os = new FileOutputStream(file2);
				// 输入流
				InputStream is = new FileInputStream(file);

				byte[] buf = new byte[1024];
				int length = 0;

				while (-1 != (length = is.read(buf))) {
					os.write(buf, 0, length);
				}
				is.close();
				os.close();

				activity.setTemplate(fileFileName2);
				adminService.addActivity(activity,activityGroupID);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				sendMsg2Client(Constants.JSON_FAILURE);
			}
		}

		sendMsg2Client(Constants.JSON_SUCCESS);

		return null;
	}

	public String updateActivity() {
		try {
			List<Activity> newActivities = JSON.parseArray(JSONActivities,
					Activity.class);
			adminService.updateActivity(newActivities);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}
		sendMsg2Client(Constants.JSON_SUCCESS);

		return null;
	}

	public String findActivity() {

		try {
			activityName = java.net.URLDecoder.decode(activityName, "UTF-8");
			// activityName = new String(activityName.getBytes("UTF-8"),
			// "utf-8");

			List<glut.db.auto.Activity> activities = adminService
					.findActivityByName(activityName);

			// String json = JSON.toJSONString(activities);
			//过滤属性
			String[] filtered=new String[]{"activitySignUps"};
			String json = JSONFormat.covert2ExtjsGrid(activities, filtered);

			sendMsg2Client(json);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String findAllActivity() {
		try {
			List<Activity> activities = adminService.getAllActivity();

			String json = JSONFormat.covert2ExtjsGrid(activities);
			logger.debug(json);
			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	public String findAllFinishedActivity() {
		try {
			//mod by yattie 需求变更：需要报名中查看报名情况
			//List<Activity> activities = adminService.getAllFinishedActivity();
			List<Activity> activities = adminService.getAllActivity();
			String json = JSONFormat.covert2ExtjsGrid(activities);

			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}
	
	public String findAllActivityGroup() {
		try {
			List list = adminService.getAllActivityGroup();
			
			String json = JSONFormat.covert2ExtjsGrid(list);
			logger.debug(json);
			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}
	
	public String exportSpecifiedActivityInfo() throws Exception {
		Activity act = adminService.findActivityByID(activityID);
		String template = act.getTemplate();
		if (act == null) {
			sendMsg2Client(Constants.JSON_FAILURE);
			return null;
		}
		ArrayList<Object> playerData = (ArrayList<Object>) adminService
				.findAllActivityPlayers(activityID);

		String folderName = "createdExcel";
		String subPath = "/sys_act/" + folderName;

		String tempExcelPath = Constants.getDirUpload()+subPath;

		String tempExcelName = act.getId() + ".xls";

		logger.debug("活动excel路径：" + tempExcelPath + "/" + tempExcelName);

		try {
			createExcel(act, playerData, tempExcelPath, tempExcelName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 创建excel失败要告诉客户端
			sendMsg2Client(Constants.JSON_FAILURE);
			return null;
		}
		if ("".equals(template) || template == null || template.equals("null")) {
			sendMsg2Client(folderName + "/" + tempExcelName);
		} else {
			String zipFolderName = "zip";
			String zipFileName = activityID + ".zip";
			createZip(activityID, tempExcelName);
			sendMsg2Client(zipFolderName + "/" + zipFileName);
		}
		return null;
	}

	/**
	 * 需求变更v1.0 1.1修改 将活动报名表和excel表压缩成zip包 add by xupk
	 * 
	 * @throws Exception
	 * */
	private void createZip(String actId, String tempExcelName) throws Exception {
		String zipFolderName = "zip/" + actId;
		String zipFolderName2 = "zip";
		String excelFolderName = "createdExcel";
		String docFolderName = "signup_doc/" + actId;
		String zipPath = "/sys_act/" + zipFolderName; // 创建目录：/sys_act/zip/活动id
		String zipPath2 = "/sys_act/" + zipFolderName2; // 创建目录：/sys_act/zip/活动id
		String excelPath = "/sys_act/" + excelFolderName; // 获取excel表所在目录：/sys_act/createdExcel
		String docPath = "/sys_act/" + docFolderName; // 获取活动表word文件所在目录：/sys_act/signup_doc/活动id/目录下的所有文件
		String tempZipPath = Constants.getDirUpload()+zipPath;
		String destZipPath = Constants.getDirUpload()+zipPath2;
		String tempExcelPath = Constants.getDirUpload()+excelPath;
/*		String tempDocPath = ServletActionContext.getServletContext()
				.getRealPath(docPath);*/
		String tempDocPath = Constants.getDirUpload()+docPath;
		String excelZipName = actId + ".xls"; // 复制到/sys_act/zip/活动id/目录下的excel文件名：活动id+".xls"
		File excelFile = new File(tempExcelPath, tempExcelName); // 获取需要复制的excel文件
		File docFile = new File(tempDocPath); // 获取需要复制的word文件
		File excelZipFile = new File(tempZipPath, excelZipName); // 复制后的excel文件所在目录和文件名
		File docZipFile = new File(tempZipPath); // 复制后的word文件所在

		if (!excelZipFile.getParentFile().exists()) {
			excelZipFile.getParentFile().mkdirs();
		}
		if (!docZipFile.getParentFile().exists()) {
			docZipFile.getParentFile().mkdirs();
		}
		// 将相应的excel和word文件复制到/sys_act/zip/活动id/目录下
		copyFolder(excelFile, excelZipFile);
		copyFolder(docFile, docZipFile);

		String zipFileName = actId + ".zip";
		// 压缩文件
		compressedFile(tempZipPath, destZipPath, zipFileName);

	}

	/**
	 * @desc 将源文件/文件夹生成指定格式的压缩文件,格式zip
	 * @param resourePath
	 *            源文件/文件夹
	 * @param targetPath
	 *            目的压缩文件保存路径
	 * @return void
	 * @throws Exception
	 */
	public void compressedFile(String resourcesPath, String targetPath,
			String zipFileName) throws Exception {
		File resourcesFile = new File(resourcesPath); // 源文件
		File targetFile = new File(targetPath); // 目的
		// 如果目的路径不存在，则新建
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}

		String targetName = zipFileName; // 目的压缩文件名
		FileOutputStream outputStream = new FileOutputStream(targetPath + "\\"
				+ targetName);
		ZipOutputStream out = new ZipOutputStream(new BufferedOutputStream(
				outputStream));

		createCompressedFile(out, resourcesFile, "");

		out.close();
	}

	/**
	 * @desc 生成压缩文件。 如果是文件夹，则使用递归，进行文件遍历、压缩 如果是文件，直接压缩
	 * @param out
	 *            输出流
	 * @param file
	 *            目标文件
	 * @return void
	 * @throws Exception
	 */
	public void createCompressedFile(ZipOutputStream out, File file, String dir)
			throws Exception {
		// 如果当前的是文件夹，则进行进一步处理
		if (file.isDirectory()) {
			// 得到文件列表信息
			File[] files = file.listFiles();
			// 将文件夹添加到下一级打包目录
			out.putNextEntry(new ZipEntry(dir + "/"));

			dir = dir.length() == 0 ? "" : dir + "/";

			// 循环将文件夹中的文件打包
			for (int i = 0; i < files.length; i++) {
				createCompressedFile(out, files[i], dir + files[i].getName()); // 递归处理
			}
		} else { // 当前的是文件，打包处理
			// 文件输入流
			FileInputStream fis = new FileInputStream(file);

			out.putNextEntry(new ZipEntry(dir));
			// 进行写操作
			int j = 0;
			byte[] buffer = new byte[1024];
			while ((j = fis.read(buffer)) > 0) {
				out.write(buffer, 0, j);
			}
			// 关闭输入流
			fis.close();
		}
	}

	/**
	 * 复制一个目录及其子目录、文件到另外一个目录
	 * 
	 * @param src
	 * @param dest
	 * @throws IOException
	 */
	private void copyFolder(File src, File dest) throws IOException {
		if (src.isDirectory()) {
			if (!dest.exists()) {
				dest.mkdir();
			}
			String files[] = src.list();
			for (String file : files) {
				File srcFile = new File(src, file);
				File destFile = new File(dest, file);
				// 递归复制
				copyFolder(srcFile, destFile);
			}
		} else {
			InputStream in = new FileInputStream(src);
			OutputStream out = new FileOutputStream(dest);

			byte[] buffer = new byte[1024];

			int length;

			while ((length = in.read(buffer)) > 0) {
				out.write(buffer, 0, length);
			}
			in.close();
			out.close();
		}
	}
	/*创建活动汇总excel*/
	private void createExcel(Activity act, ArrayList<Object> playerData,
			String tempExcelPath, String tempExcelName) throws IOException,
			RowsExceededException, WriteException {

		String template = act.getTemplate();
		int col, row;
		File excelFile = new File(tempExcelPath, tempExcelName);

		if (!excelFile.getParentFile().exists()) {
			excelFile.getParentFile().mkdirs();
		}

		WritableWorkbook wwb = Workbook.createWorkbook(excelFile);
		WritableSheet ws = wwb.createSheet("Sheet1", 0);
		// excel第一行显示活动序号，活动名称，报名人数，人数上限，活动时间
		for (col = 0; col < Constants.EXCEL_ACT_COL_NAME.length; col++) {
			ws.addCell(new Label(col, 0, Constants.EXCEL_ACT_COL_NAME[col]));
		}
		// 第二行显示第一行的对应信息
		ws.addCell(new Label(0, 1, act.getId()));
		ws.addCell(new Label(1, 1, act.getName()));
		ws.addCell(new Label(2, 1, act.getPopulationCurrent() + ""));
		ws.addCell(new Label(3, 1, act.getPopulationLimit() + ""));
		if(act.getActivityTime()!=null && !act.getActivityTime().equals("")){
		ws.addCell(new Label(4, 1, new SimpleDateFormat("yyyy-MM-dd")
				.format(act.getActivityTime())));
		}
		if(act.getActCustomtime()!=null && !act.getActCustomtime().equals("")){
			ws.addCell(new Label(5, 1, act.getActCustomtime() + ""));
		}
		// 第三行显示序号，参赛者姓名，单位，分工会，电话，备注，报名表
		for (col = 0; col < Constants.EXCEL_ACT_PLAYER_COL_NAME.length; col++) {
			ws.addCell(new Label(col, 2,
					Constants.EXCEL_ACT_PLAYER_COL_NAME[col]));
		}
		// 之后的行依次显示报名的会员信息
		if (playerData != null) {
			// 获取每一条报名者的信息
			for (row = 0; row < playerData.size(); row++) {
				ActivitySignUp rowData = (ActivitySignUp) playerData.get(row);
				// 序号
				ws.addCell(new Label(0, row + 3, "" + (row + 1)));
				// 参赛者姓名，单位，分工会，电话，备注，报名表
				ws.addCell(new Label(1, row + 3, ""
						+ rowData.getMember().getName()));
				ws.addCell(new Label(2, row + 3, ""
						+ rowData.getMember().getDpmBrief()));
				ws.addCell(new Label(3, row + 3, ""
						+ rowData.getMember().getSubUnion()));
				ws.addCell(new Label(4, row + 3, "" + rowData.getPlayerPhone()));
				ws.addCell(new Label(5, row + 3, "" + rowData.getNotes()));

				// 判断报名表为空的情况，设置报名表栏为空值
				if (template != null) {
					// 需要提交报名表
					// 报名表不为空，添加超链接
					String signdoc = rowData.getSignupDoc();
					if (signdoc != null) {
						//String formu = "file://./" + signdoc;
						WritableHyperlink hyper=new WritableHyperlink(6,row + 3, new File(signdoc));
						ws.addHyperlink(hyper);
						//delete by yattie 
						//break;
					}
				}

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

	public void setActivity(Activity activity) {
		this.activity = activity;
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public String getTestStr() {
		return testStr;
	}

	public void setTestStr(String testStr) {
		this.testStr = testStr;
	}

	public Activity getActivity() {
		return activity;
	}

	public String getActivities() {
		return JSONActivities;
	}

	public void setActivities(String activities) {
		this.JSONActivities = activities;
	}

	public String getActivityID() {
		return activityID;
	}

	public void setActivityID(String activityID) {
		this.activityID = activityID;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public String getActivityGroupID() {
		return activityGroupID;
	}

	public void setActivityGroupID(String activityGroupID) {
		this.activityGroupID = activityGroupID;
	}

}
