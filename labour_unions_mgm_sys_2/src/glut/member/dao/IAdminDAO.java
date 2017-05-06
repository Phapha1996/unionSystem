package glut.member.dao;

import java.util.ArrayList;
import java.util.List;

public interface IAdminDAO {
	//	List<Admin> findAdminByIdPwd(Admin admin);

	void addMembers(ArrayList<ArrayList<String>> excelData);

	List findByFields(ArrayList<String> fields);
}
