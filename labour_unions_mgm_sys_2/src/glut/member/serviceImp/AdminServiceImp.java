package glut.member.serviceImp;

import glut.db.auto.Member;
import glut.member.dao.AdminDAO;
import glut.member.service.AdminService;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service("adminServiceImp_mb")
public class AdminServiceImp implements AdminService {
	private AdminDAO adminDAO;
	private static Logger logger = Logger.getLogger(AdminServiceImp.class);

	@Override
	public String loadExcelToDB(File excel) throws BiffException, IOException {
		// TODO Auto-generated method stub
		// 业务层处理excel的获取
		Workbook workbook = Workbook.getWorkbook(excel);
		Sheet sheet = workbook.getSheet(0);

		int rows = sheet.getRows();
		int columns = sheet.getColumns();

		// 存放返回的插入失败的所有数据
		ArrayList<ArrayList<String>> errorData = null;
		// 存放插入失败的每一行数据
		ArrayList<String> errorRowData = null;

		// 存放sheet0的所有数据
		ArrayList<ArrayList<String>> sheetData = new ArrayList<ArrayList<String>>(
				rows + 1);
		for (int row = 1; row < rows; row++) {
			// 存放sheet0每一行的数据
			ArrayList<String> rowData = new ArrayList<String>(columns + 1);

			for (int col = 0; col < columns; col++) {

				rowData.add(sheet.getCell(col, row).getContents());
			}

			sheetData.add(rowData);
		}

		// 插入数据，如果有某些数据插入失败的，则返回的是每一行失败的数据存放在errorData
		errorData = adminDAO.addMembers(sheetData);
		// errorData没有数据，说明全部插入成功
		if (errorData.toString() == "[]") {
			return null;
		} else { // 否则读取插入失败的数据，存放到文本文件内
			// 插入失败将返回的数据放到指定目录下的文本文件
			String folderName = "errorData";
			String subPath = "/sys_mb/" + folderName;
			String tempTxtPath = ServletActionContext.getServletContext()
					.getRealPath(subPath);
			// 定义时间戳
			Date now = Calendar.getInstance().getTime();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");
			String tempTxtName = sdf.format(now) + "_insertError.txt";
			File txtFile = new File(tempTxtPath, tempTxtName);
			if (!txtFile.getParentFile().exists()) {
				txtFile.getParentFile().mkdirs();
			}
			// 创建文本文件
			txtFile.createNewFile();
			try {
				FileWriter fw = new FileWriter(txtFile, true);
				BufferedWriter bw = new BufferedWriter(fw);
				// 写入数据
				for (int i = 0; i < errorData.size(); i++) {
					errorRowData = errorData.get(i);
					for (int j = 0; j < errorRowData.size(); j++) {
						if (j < errorRowData.size() - 1) {
							bw.write(errorRowData.get(j) + ",");
						} else {
							bw.write(errorRowData.get(j));
						}
					}
					bw.write("\r\n");
				}
				bw.flush();
				bw.close();
				fw.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return folderName + "/" + tempTxtName;
		}
	}

	@Override
	public List loadExcelFromDB(String fields) {
		if (fields == null) {
			return adminDAO.findByArgs("*", "member", null, null, null, null,
					true);
		} else {
			return adminDAO.findByArgs(
					fields.substring(0, fields.length() - 1), "Member", null,
					null, null, null, false);
		}
	}

	@Override
	public List findByName(String name) {
		// TODO Auto-generated method stub
		logger.debug("***findByName**");
		return adminDAO
				.findByArgs(
						null,
						"Member", "name like '%" + name + "%'",
						null, null, null, false);
	}

	@Override
	public List findByNumber(String number) {
		// TODO Auto-generated method stub
		logger.debug("***findByNumber**");
		return adminDAO
				.findByArgs(
						null,
						"Member", "number='" + number +"'", null, null,
						null, false);
	}

	@Override
	public void changeMemberInfo(Member member) throws Exception {
		// TODO Auto-generated method stub
		adminDAO.update(member);
	}

	@Override
	public String findRolesByAccount(String account) {
		// TODO Auto-generated method stub
		List<Object> list = adminDAO.findByArgs("DISTINCT us.rid ",
				"users u JOIN users_roles us ON u.id=us.uid ", "u.account='"
						+ account + "'", null, null, null, true);
		if (list.size() > 0) {
			StringBuilder roles = new StringBuilder();
			for (Object rid : list) {
				roles.append(rid + ",");
			}
			roles.deleteCharAt(roles.length() - 1);
			return roles.toString();
		} else {
			return "";
		}

	}

	@Override
	public void addRole(String account, String roles) {
		// TODO Auto-generated method stub
		String uid = adminDAO
				.findByArgs("id", "users", "account='" + account + "'", null,
						null, null, true).get(0).toString();
		adminDAO.addRole(uid, roles);
	}

	@Override
	public void deleteRole(String account, String roles) {
		// TODO Auto-generated method stub
		String uid = adminDAO
				.findByArgs("id", "users", "account='" + account + "'", null,
						null, null, true).get(0).toString();
		adminDAO.deleteRole(uid, roles);
	}

	// *********************getter setter***************
	public AdminDAO getAdminDAO() {
		return adminDAO;
	}

	@Resource
	public void setAdminDAO(AdminDAO adminDAO) {
		this.adminDAO = adminDAO;
	}

}
