package glut.member.service;

import java.util.ArrayList;
import java.util.List;

public interface IAdminService {
	//	boolean isExist(Admin admin);

	void loadExcelToDB(ArrayList<ArrayList<String>> excelData);

	List loadExcelFromDB(ArrayList<String> fields);
}
