package glut.activity.serviceImp;

import glut.activity.dao.UserDAO;
import glut.activity.service.UserService;
import glut.db.auto.Activity;
import glut.db.auto.ActivitySignUp;
import glut.db.auto.Member;
import glut.db.auto.Users;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;

@Transactional
@Service("userServiceImp_act")
public class UserServiceImp implements UserService {
	@Resource
	private UserDAO userDAO;
	private String time;

	@Override
	/**
	 * return: 添加活动处理状态：0-成功；1-人满； 
	 */
	public int joinActivity(String actId, String account, String phone,
			String memo, String fileName2, String sex) throws Exception {
		// TODO Auto-generated method stub
		List<Object[]> list = userDAO.findByArgs(
				"population_limit,population_current,object,act_group_id,dead_line", "activity",
				"id='" + actId + "'", null, null, null, true);
		Object[] objects = list.get(0);

		int[] population = { 0, 0 };

		population[0] = Integer.valueOf(objects[0].toString());
		population[1] = Integer.valueOf(objects[1].toString());

		int limit = population[0];
		int current = population[1];
		String obj = objects[2].toString();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = sdf.parse(objects[4].toString());
		Date nowaday = new Date();
		nowaday = sdf.parse(sdf.format(nowaday));
		
		if(nowaday.compareTo(date)>0){
			return 4;					//报名时间超过截止时间
		}
		
		if(objects[3]!=null){			//参加的活动如果存在分组
			try {
				int act_group_id = Integer.valueOf(objects[3].toString());
				List list2 = userDAO.findByArgs(
								null,
								"ActivitySignUp asu,Activity a",
								"asu.member.number='"+account
								+"' AND asu.activity.id=a.id AND a.activityGroup.id='"
										+act_group_id+"'", 
								null, null,
								null, false);
				if(list2.size()>0){
					return 3;				//活动分组限制，参加的同一分组活动数目超出了限制
				}
			} catch (Exception e) {
				System.out.println("UserServiceImp活动分组查询出错");
				e.printStackTrace();
			}
		}
		
		// add by yattie

		if(sex!=null){
			if ((sex.equals("男") && obj.equals("女性教职工"))
					|| (sex.equals("女") && obj.equals("男性教职工"))) // 性别不符合
			{
				return 2;
			}
		}
		
		if (limit > 0 && current + 1 > limit)// 人满
		{
			return 1;
		}

		Member mb = new Member();
		mb.setNumber(account);

		List list2 = userDAO.findByArgs(null, "Activity", "id='" + actId + "'",
				null, null, null, false);
		Activity act = (Activity) (list2.isEmpty() ? null : list2.get(0));

		ActivitySignUp signUp = new ActivitySignUp();
		signUp.setMember(mb);
		signUp.setActivity(act);
		signUp.setPlayerPhone(phone);
		signUp.setNotes(memo);
		signUp.setResult("报名成功");
		// delete by yattie
		// if (limit <= current) {
		// signUp.setResult("人满,报名失败");
		// }
		signUp.setSignupDoc(fileName2);
		userDAO.save(signUp);
		
		act.setPopulationCurrent(current + 1);
		// 更新activity的参与人数
		userDAO.update(act);
		return 0;

	}

	@Override
	public boolean checkOldPwd(String account, String oldpassword)
			throws Exception {
		List list = userDAO.findByArgs(null, "Users", "account='" + account
				+ "' and password='" + oldpassword + "'", null, null, null,
				false);
		return list.isEmpty() ? false : true;
	}

	@Override
	public void changePwd(String account, String newPwd) throws Exception {
		// TODO Auto-generated method stub
		List list = userDAO.findByArgs(null, "Users", "account='" + account
				+ "'", null, null, null, false);

		Users mb = (Users) (list.isEmpty() ? null : list.get(0));
		mb.setPassword(newPwd);
		userDAO.update(mb);
	}

	@Override
	public List<Activity> getActivity(String activityStatus,
			String activityType, String mbAccount) throws ParseException {
		// TODO Auto-generated method stub

		List<Object[]> list = userDAO
				.findByArgs(
						"a.id, a.`name`, a.object, a.dead_line, a.activity_time, a.notes,a.`status`, a.population_limit, a.activity_type, a.population_current, a.template, a.act_time, a.act_location,a.act_customtime",
						"activity a ", "a.`status` = '" + activityStatus + "' "
								+ "AND a.activity_type = '" + activityType
								+ "' " + "AND a.id NOT IN ("
								+ "SELECT asu.activity_id "
								+ "FROM activity_sign_up asu "
								+ "WHERE asu.player_number='" + mbAccount
								+ "')", null, null, null, true);

		ArrayList<Activity> activities = new ArrayList<Activity>(list.size());

		for (Object[] objects : list) {
			Activity tempAct = new Activity();

			tempAct.setId(objects[0] + "");
			tempAct.setName(objects[1] + "");
			tempAct.setObject(objects[2] + "");
			tempAct.setDeadLine((Date) objects[3]);
			tempAct.setActivityTime((Date) (objects[4]));
			tempAct.setNotes(objects[5] + "");
			tempAct.setStatus(objects[6] + "");
			tempAct.setPopulationLimit((Integer) objects[7]);
			tempAct.setActivityType(objects[8] + "");
			tempAct.setPopulationCurrent((Integer) (objects[9]));
			tempAct.setTemplate(objects[10] + "");
			tempAct.setActTime((Time) objects[11]);
			tempAct.setActLocation(objects[12] + "");
			tempAct.setActCustomtime(objects[13] + "");

			activities.add(tempAct);
		}

		return activities;
	}

	@Override
	/*待修改*/
	public String getResults(String account) throws ParseException {
		// TODO Auto-generated method stub
		List<Object[]> list = userDAO
				.findByArgs(
						"a.id, a.`name`, a.object, a.dead_line, a.activity_time, a.notes,a.`status`,a.population_limit,	a.activity_type, a.population_current,asu.result , a.act_time, a.act_location",
						"activity_sign_up asu JOIN activity a ON asu.activity_id=a.id ",
						"asu.player_number='" + account
								+ "' and a.`status`!='无效'", null, null, null,
						true);

		int listSize = list.size();

		// 由于查看结果页面需要看到活动信息和结果，结果不在活动表中，所以只好通过修改json来达到目的，将对应的活动和结果以key，value形式保存。
		Map<Activity, String> actAndResult = new HashMap<>();

		for (Object[] objects : list) {
			Activity tempAct = new Activity();

			tempAct.setId(objects[0] + "");
			tempAct.setName(objects[1] + "");
			tempAct.setObject(objects[2] + "");
			tempAct.setDeadLine((Date) objects[3]);
			tempAct.setActivityTime((Date) (objects[4]));
			tempAct.setNotes(objects[5] + "");
			tempAct.setStatus(objects[6] + "");
			tempAct.setPopulationLimit((Integer) objects[7]);
			tempAct.setActivityType(objects[8] + "");
			tempAct.setPopulationCurrent((Integer) (objects[9]));

			// 第n行第10个值是该条活动的结果
			actAndResult.put(tempAct, objects[10] + "");

			tempAct.setActTime((Time) objects[11]);
			tempAct.setActLocation(objects[12] + "");

		}

		StringBuilder sb = new StringBuilder("{totalProperty:"
				+ actAndResult.size() + ",root:[");
		for (Entry<Activity, String> entry : actAndResult.entrySet()) {

			StringBuilder jsonStr = new StringBuilder(JSON.toJSONString(entry
					.getKey()));

			sb.append(jsonStr.deleteCharAt(jsonStr.length() - 1).toString()
					+ ",'result':'" + entry.getValue() + "'},");
		}

		return sb.deleteCharAt(sb.length() - 1).append("]}").toString();
	}

	/**
	 * 根据活动名称、状态查找会员的活动报名结果
	 * */
	@Override
	public List findSpecifiedResults(String account, String status,
			String name) throws Exception {
		// String selectSQL =
		// "a.id, a.`name`, a.object, a.dead_line, a.activity_time, a.notes,a.`status`,a.population_limit,	a.activity_type, a.population_current, a.act_time, a.act_location, asu.result ";
		// String fromSQL =
		// "activity_sign_up asu JOIN activity a ON asu.activity_id=a.id ";
		//含中文查询,强制转为UTF-8
		//name = java.net.URLDecoder.decode(name, "UTF-8");
		String whereSQL = "asu.member.number='" + account + "'";
		//String whereSQL = "activity.name like '%" + name + "%'";
		List<ActivitySignUp> list = null;
		// 构造where子句，
		// 状态为空或0，名称不为空，直接根据活动名称查找所有活动（包含无效活动）
		if (status == null || status.equals("0") && name != null) {
			whereSQL = whereSQL + " and activity.name like '%" + name + "%'";
		}
		// 状态为0，包含无效活动。活动名称为空，查找所有活动
		else if (status.equals("0") && name == null) {
			//
		}
		// 状态为1，不包含无效活动。根据活动名称查找所有活动（不包含无效状态的活动）
		else if (status.equals("1") && name != null) {
			whereSQL = whereSQL
					+ " and activity.status!='无效' and activity.name like '%"
					+ name + "%'";
		}
		// 状态为1，不包含无效活动。活动名称为空，查找所有活动（但不包含无效活动）
		else if (status.equals("1") && name == null) {
			whereSQL = whereSQL + " and activity.status!='无效'";
		}

		list = userDAO.findByArgs(
				null, 
				"ActivitySignUp asu", 
				whereSQL, 
				null, null,	null, false);
		// int listSize = list.size();
		return list;
		// 由于查看结果页面需要看到活动信息和结果，结果不在活动表中，所以只好通过修改json来达到目的，将对应的活动和结果以key，value形式保存。
		// Map<Activity, String> actAndResult = new HashMap<>();
		//
		// for (Object[] objects : list) {
		// Activity tempAct = new Activity();
		//
		// tempAct.setId(objects[0] + "");
		// tempAct.setName(objects[1] + "");
		// tempAct.setObject(objects[2] + "");
		// tempAct.setDeadLine((Date) objects[3]);
		// tempAct.setActivityTime((Date) (objects[4]));
		// tempAct.setNotes(objects[5] + "");
		// tempAct.setStatus(objects[6] + "");
		// tempAct.setPopulationLimit((Integer) objects[7]);
		// tempAct.setActivityType(objects[8] + "");
		// tempAct.setPopulationCurrent((Integer) (objects[9]));
		// tempAct.setActTime((Time)objects[10]);
		// tempAct.setActLocation(objects[11] + "");
		// // 第n行第12个值是该条活动的结果
		// actAndResult.put(tempAct, objects[12] + "");
		//
		// }
		//
		// StringBuilder sb = new StringBuilder("{totalProperty:"
		// + actAndResult.size() + ",root:[");
		// for (Entry<Activity, String> entry : actAndResult.entrySet()) {
		//
		// StringBuilder jsonStr = new StringBuilder(JSON.toJSONString(entry
		// .getKey()));
		//
		// sb.append(jsonStr.deleteCharAt(jsonStr.length() - 1).toString()
		// + ",'result':'" + entry.getValue() + "'},");
		// }
		//
		// if(actAndResult.size()==0){
		// return "{totalProperty:0,root:[]}";
		// }else{
		// return sb.deleteCharAt(sb.length() - 1).append("]}").toString();
		// }
	}

}
