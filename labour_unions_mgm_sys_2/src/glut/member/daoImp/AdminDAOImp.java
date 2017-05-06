package glut.member.daoImp;

import glut.dao.BaseDao;
import glut.db.auto.Member;
import glut.member.dao.AdminDAO;
import glut.util.MD5Utils;
import glut.util.SessionPool;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

@Repository("adminDAOImp_mb")
public class AdminDAOImp extends BaseDao implements AdminDAO {
	private static Logger logger = Logger.getLogger(AdminDAOImp.class);

	@Override
	public ArrayList<ArrayList<String>> addMembers(
			ArrayList<ArrayList<String>> excelData) {
		// TODO Auto-generated method stub
		Session session = SessionPool.getCurrentSession();
		// 存放插入失败的所有数据
		ArrayList<ArrayList<String>> errorData = new ArrayList<ArrayList<String>>();
		// 存放插入失败的每一行数据
		ArrayList<String> errorRowData = new ArrayList<String>();
		// modified by yattie 覆盖插入
		// String sql_mb = "insert ignore into member values(";
		// mod by yattie 覆盖会先删除后插入，删除会影响外键相关的表格，不建议使用
		// String sql_mb = "replace into member values(";

		// mod by yattie 清除sql操作方式，改为hibernate面向对象方式

		// 逐行插入数据
		
		List<Object[]> du = session.createSQLQuery("SELECT * FROM dpm_union")
				.list();
		
		for (int i = 0; i < excelData.size(); i++) {
			// 将信息插入到member表
			ArrayList<String> rowData = excelData.get(i);
			StringBuilder sb = new StringBuilder();
			Member mb = new Member();

//			for (int j = 0; j < rowData.size(); j++) {
//				sb.append("'" + rowData.get(j) + "',");
//			}
			int count=0;
			mb.setName(rowData.get(count++));
			mb.setIdCard(rowData.get(count++));
			mb.setNumber(rowData.get(count++));
			mb.setEmployType(rowData.get(count++));
			mb.setJoinCondition(rowData.get(count++));
			mb.setDpmBrief(rowData.get(count++));
			mb.setSubUnion(rowData.get(count++));
			mb.setDpmDetail(rowData.get(count++));
			mb.setDuty(rowData.get(count++));
			mb.setTakeOfferDate(rowData.get(count++));
			mb.setLevel(rowData.get(count++));
			mb.setReachLevelDate(rowData.get(count++));
			mb.setNative_(rowData.get(count++));
			mb.setSex(rowData.get(count++));
			mb.setNationality(rowData.get(count++));
			mb.setBirthday(rowData.get(count++));
			mb.setTopEducation(rowData.get(count++));
			mb.setTopDegree(rowData.get(count++));
			mb.setPolitics(rowData.get(count++));
			mb.setJoinDate(rowData.get(count++));
			mb.setWorkDate(rowData.get(count++));
			mb.setTitle(rowData.get(count++));
			mb.setTitleLevel(rowData.get(count++));
			mb.setFirstEmpJob(rowData.get(count++));
			mb.setFirstEmpJobType(rowData.get(count++));
			mb.setGraduateSch(rowData.get(count++));
			mb.setTopEduDate(rowData.get(count++));
			mb.setTopDegreeDate(rowData.get(count++));
			mb.setMajor(rowData.get(count++));
			mb.setSubject(rowData.get(count++));
			mb.setJoinSchDate(rowData.get(count++));
			
			
			//add by lingdq; modified by yattie
			int flag = 0;
			String subUnion="";
			//根据部门名称获取对应的分工会名称
			for(int j=0;j<du.size();j++){
				if(du.get(j)[1].equals(rowData.get(5))){//第5列为部门名称
					subUnion=(String) du.get(j)[2];
					flag = 1;
					break;
				}
			}
			if(flag==0){//无法找到与部门名称对应的分工会
				subUnion="未知";
			}else{
				mb.setSubUnion(subUnion);
			}
			

			// int updateCount_mb = session.createSQLQuery(
			// sb.substring(0, sb.length() - 1) + ")").executeUpdate();
			try {
				//保存或者更新会员
				session.saveOrUpdate(mb);
				session.flush();//先提交，否则后面的外键约束无法插入user表
				// 将会员信息加入到user表
				String empIDCard = rowData.get(1);// excel第2栏为员工身份证
				// add by yattie, 判断身份证是否为空
				if (empIDCard == null || empIDCard.trim().isEmpty()) {
					// 身份证为空，取员工编号后6位作为初始密码
					String empNumber1 = rowData.get(2);
					empIDCard = empNumber1.substring(empNumber1.length() - 6);

				} else {// 存在身份证，则取最后6位作为初始密码
					empIDCard = empIDCard.substring(empIDCard.length() - 6);
					// 全部小写
					empIDCard = empIDCard.toLowerCase();
				}

				empIDCard = MD5Utils.toMD5(empIDCard); // 初始密码MD5处理

				String empNumber = rowData.get(2);// excel第3栏为员工编号

				// mod by yattie 如果已经存在该用户，则忽略（因为密码有可能用户更改过）;不存在则插入
				String sql_users = "insert ignore into users(account,password) values('"
						+ empNumber + "','" + empIDCard + "')";
				// mod by yattie 覆盖会先删除后插入，删除会影响外键相关的表格，不建议使用
				// String sql_users =
				// "replace into users(account,password) values('"
				// + empNumber + "','" + empIDCard + "')";
				int updateCount_users = session.createSQLQuery(sql_users)
						.executeUpdate();
				// if(updateCount_users==0){
				// throws new Exception("XXX");
				// }

				// 将数据库的触发器tg2改成Java代码实现.modify by xupk from 需求变更v2.2 meb-2.1
				if (updateCount_users != 0) {
					// 获取users表最后一次插入的id
					String sql_userId = "select max(id) from users";
					SQLQuery query = session.createSQLQuery(sql_userId);
					List list = query.list();
					int uid = (int) list.get(0);
					String sql_userRole = "insert ignore into users_roles(uid,rid) values('"
							+ uid + "'," + "'2')";
					int updateCount_ur = session.createSQLQuery(sql_userRole)
							.executeUpdate();
				}

			} catch (Exception se) {
				// 当某一行数据插入失败的时候，将其放到errorRowData存放
				errorRowData = rowData;
				errorData.add(errorRowData);
			}
		}
		return errorData;
	}

	@Override
	public void addRole(String uid, String rid) {
		// TODO Auto-generated method stub
		String sql = "insert ignore into users_roles(uid,rid) values(" + uid
				+ "," + rid + ")";
		logger.debug("这里这里这里111111~~~~~~~~" + sql);
		SessionPool.getCurrentSession().createSQLQuery(sql).executeUpdate();
	}

	@Override
	public void deleteRole(String uid, String rid) {
		// TODO Auto-generated method stub
		String sql = "delete from users_roles where uid=" + uid + " and rid="
				+ rid;
		logger.debug("这里这里这里22222222~~~~~~~~" + sql);

		SessionPool.getCurrentSession().createSQLQuery(sql).executeUpdate();
	}

}
