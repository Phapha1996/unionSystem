package glut.proposal.service;

import glut.db.auto.Proposal;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
public interface UserService {
	// 教代会代表功能
	void submitProposal(Proposal proposal) throws Exception;

	void comment(Proposal proposal) throws Exception;

	void feedBack(Proposal proposal) throws Exception;

	// 提案委员会功能
	void apporveProposal(Proposal proposal) throws Exception;

	void updateProposal(List<Proposal> proposals, String dpmLv, String mdfAdv,
			String proId) throws Exception;

	boolean isSupporter(String name) throws Exception;

	List findProposals4Export(Map<String, String> params) throws Exception;

	List findProposals(String whereArgs) throws Exception;

	void apporveProposalCommon(String proId, String account, String mainUnit,
			String assistantUnit, String advice) throws Exception;

	String findCmtMbAdv(String proId) throws Exception;

	// 相关部门功能
	void reply(String dpmLv, String replyContent, String proId)
			throws Exception;

	/**
	 * @author xupk 20151221
	 * */
	List loadExcelFromDB();
	
	List loadSpecifiedProposalsFromDB(Map<String, String> params);
}
