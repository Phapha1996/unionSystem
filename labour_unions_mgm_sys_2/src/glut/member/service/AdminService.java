package glut.member.service;

import glut.db.auto.Member;

import java.io.File;
import java.io.IOException;
import java.util.List;

import jxl.read.biff.BiffException;

public interface AdminService {

	String loadExcelToDB(File excel) throws BiffException, IOException;

	List loadExcelFromDB(String fields);

	void changeMemberInfo(Member member) throws Exception;

	List findByName(String name);

	List findByNumber(String number);

	String findRolesByAccount(String account);

	void addRole(String account, String roles);

	void deleteRole(String account, String roles);
}
