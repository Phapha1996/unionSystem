package proposal;

import static org.junit.Assert.*;

import java.util.List;

import glut.db.auto.Proposal;
import glut.member.dao.AdminDAO;
import glut.proposal.dao.UserDAO;
import glut.proposal.service.UserService;
import glut.util.Constants;

import javax.annotation.Resource;

import org.junit.Test;

import util.MyTransactionalSpringContextTests;

public class DepartmentTest extends MyTransactionalSpringContextTests{
	@Resource
	UserService userServiceImp_pro;
	@Resource
	UserDAO userDAO;
	@Resource
	AdminDAO adminDAO;
	
	
	public Proposal getProposal(){
		Proposal obj=new Proposal();
		/*注意：输入的数据应该与界面上用户看到的数据高度一致
		如：提交时间界面上没有，这里也不需要set*/
		String submitterName="蒋存波";
		String submitterDpm="信息科学与工程学院";
		String submitterPhone="18955454878";
		String supporter1="黄琳";
		String supporter2="李纯纯";
		String category="交通运输";
		String title="提案测试标题1：老师家访；阿狸减肥上了飞机啊；浪费就发生了；放假啊";
		String reason="提案测试案由1：了；啊手机费；拉接啊；上了飞机啊； ；阿加莎；冷风机\nhklasfja;lsadf雷锋精神；";
		String action="提案测试措施1：aljdl吉林省；放假啊家；啊剪短发；放假啊；上飞机啊\n"
				+ "jlfjdl;af啊；神经分裂了就发；；；啊是老地方见啊；老师家访；阿萨德减肥"
				+ "就爱了；斯蒂芬金接啊；楼上的开房间啊；楼上的开房间啊； 发生的；两色风景";
		/*构建VO*/
		obj.setSubmitterName(submitterName);
		obj.setSubmitterDpm(submitterDpm);
		obj.setSubmitterPhone(submitterPhone);
		obj.setSupporter1(supporter1);
		obj.setSupporter2(supporter2);
		obj.setCategory(category);
		obj.setTitle(title);
		obj.setReason(reason);
		obj.setAction(action);
		
		return obj;
	}

	@Test
	public void testUpdateProposal() {
		//fail("Not yet implemented");
		Proposal obj =getProposal();
		List<Proposal> proposals = null;
		List<Proposal> result1 = null;
		List<Proposal> result2 = null;
		List<Proposal> result3 = null;
		String dpmLv = null;
		String mdfAdv = "dsf";
		String proId = null;
		String comment = "这是评论";
		String committeeAdv = "同意立案";//委员会意见
		String mainUnit = "校领导";//主办部门
		String assistantUnit = "党委办公室";//协办部门
		String memo = "这是备注";//备注
		String responseLeader = "这是领导回复";//领导回复
		String progress = "正在办理";//进展
		String replyContent = "这是回复内容";//回复内容
		try {
			userServiceImp_pro.submitProposal(obj);
			obj.setComment(comment);
			//代表的
			dpmLv = "1";
			proposals = userDAO.findProposals("submitterName='蒋存波' and submitterPhone='18955454878'");
			proId = proposals.get(0).getId();
			proposals.clear();
			proposals.add(obj);
			userServiceImp_pro.updateProposal(proposals, dpmLv, mdfAdv, proId);
			result1 = userDAO.findProposals("submitterName='蒋存波' and comment='这是评论'");
			//提案委员会的
			dpmLv = "2";
			obj.setMainUnit(mainUnit);
			obj.setCommitteeAdv(committeeAdv);
			obj.setAssistantUnit(assistantUnit);
			obj.setMemo(memo);
			obj.setResponseLeader(responseLeader);
			proposals.clear();
			proposals.add(obj);
			userServiceImp_pro.updateProposal(proposals, dpmLv, mdfAdv, proId);
			result2 = userDAO.findProposals("submitterName='蒋存波' and mainUnit='"+mainUnit+"' and assistantUnit='"+assistantUnit+"'");
			//部门的
			dpmLv = "3";
			obj.setProgress(progress);
			obj.setReplyContent(replyContent);
			proposals.clear();
			proposals.add(obj);
			userServiceImp_pro.updateProposal(proposals, dpmLv, mdfAdv, proId);
			result3 = userDAO.findProposals("submitterName='蒋存波' and progress='"+progress+"' and replyContent='"+replyContent+"'");
		} catch (Exception e) {
			// TODO: handle exception
		}
		assertNotNull(result1.isEmpty() ? null : result1.get(0));
		assertNotNull(result2.isEmpty() ? null : result2.get(0));
		assertNotNull(result3.isEmpty() ? null : result3.get(0));
	}

	@Test
	public void testReply() {
		List<Proposal> result = null;
		String dpmLv;
		String replyContent;
		String proId;
		String comment = "这是评论";
		String committeeAdv = "同意立案";//委员会意见
		String mainUnit = "校领导";//主办部门
		String assistantUnit = "党委办公室";//协办部门
		String memo = "这是备注";//备注
		replyContent = "这是回复内容";
		Proposal pro = getProposal();
		pro.setComment(comment);
		pro.setCommitteeAdv(committeeAdv);
		pro.setMainUnit(mainUnit);
		pro.setAssistantUnit(assistantUnit);
		pro.setMemo(memo);
		try {
			userServiceImp_pro.submitProposal(pro);
			dpmLv = "3";
			List<Proposal> proposal = userDAO.findProposals("submitterName='蒋存波' and submitterPhone='18955454878'");
			proId = proposal.get(0).getId();
			userServiceImp_pro.reply(dpmLv, replyContent, proId);
			result = userDAO.findProposals("submitterName='蒋存波' and dpmReplyFlag='"+Constants.NEWREPLY_PPS_REPLY+"' and dpmReply='"+replyContent+"'");
		} catch (Exception e) {
			// TODO: handle exception
		}
		assertNotNull(result.isEmpty() ? null : result);
	}

}
