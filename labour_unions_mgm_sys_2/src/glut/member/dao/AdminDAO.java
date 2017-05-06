package glut.member.dao;

import glut.dao.IBaseDao;

import java.util.ArrayList;

public interface AdminDAO extends IBaseDao {
	/**
	 * 用于将上传的excel数据导入到数据库中(忽略相同职工编号的条目)
	 * 
	 * @param excelData
	 *            通过jxl取出后的excel数据
	 * @return 
	 */
	ArrayList<ArrayList<String>> addMembers(ArrayList<ArrayList<String>> excelData);

	/**
	 * 为指定用户添加角色权限
	 * 
	 * @param uid
	 *            职工号
	 * @param rid
	 *            角色id
	 */
	void addRole(String uid, String rid);

	/**
	 * 为指定用户删除角色权限
	 * 
	 * @param uid
	 *            职工号
	 * @param rid
	 *            角色id
	 */
	void deleteRole(String uid, String rid);

}
